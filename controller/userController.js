import { validationResult, matchedData } from 'express-validator'
import createError from 'http-errors';
import { Gateway, Wallets } from 'fabric-network';
import FabricCAServices from 'fabric-ca-client';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { buildCAClient, registerAndEnrollUser, enrollAdmin } from '../../fabric-samples/test-application/javascript/CAUtil.js';
import { buildCCPOrg1, buildCCPOrg2, buildWallet } from '../../fabric-samples/test-application/javascript/AppUtil.js';

const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'basic';

const mspOrg1 = 'Org1MSP';
const walletPath = join(__dirname, '../wallet');
const org1UserId = 'javascriptAppUser';

const ccp = buildCCPOrg1();
const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
const wallet = await buildWallet(Wallets, walletPath);


import authentication from '../middlewares/authentication.js';

import ProductBase from '../models/product.js';
import BrandBase from '../models/brand.js';
import OrderBase from '../models/order.js';
import CartBase from '../models/cart.js';
import UserBase from '../models/user.js';

const GetOrderDetail = async (req, res, next) => {
	const result = validationResult(req);

	if (result.isEmpty()) {
		const { _id } = matchedData(req);
		let products = []

		const order = await OrderBase.findOne({ _id }).lean();

		for (const p of order.product_and_quantity) {
			let product = await ProductBase.findOne({ _id: p.pid }).lean()
			products.push({ product, quantity: p.quantity })
		}

		res.render('o_detail', { order, products, header: 'header', footer: 'footer', })
		return
	}

	return next(createError(404, 'Oops! Error in function GetOrderDetail (User Controller)!'));
}

const GetListAsset = async (req, res, next) => {
	const currentUser = req.session.user || req.cookies.user;
	const user = await UserBase.findOne({ _id: currentUser._id }).lean()
	const assets = []

	if (user.assets === 0) {
		res.render('o_asset', { header: 'header', footer: 'footer', })
		return
	}

	for (const asset_id of user.assets) {
		try {
			const gateway = new Gateway();

			try {
				await gateway.connect(ccp, {
					wallet,
					identity: org1UserId,
					discovery: { enabled: true, asLocalhost: true },
				});

				const network = await gateway.getNetwork(channelName);

				const contract = network.getContract(chaincodeName);

				let result = await contract.evaluateTransaction('ReadAsset', asset_id);
				let jsonAsset = JSON.parse(result)
				let product = await ProductBase.findOne({ p_id: jsonAsset.p_id, }).lean()

				assets.push({
					ID: jsonAsset.ID,
					docType: jsonAsset.docType,
					owner: jsonAsset.owner,
					p_id: jsonAsset.p_id,
					p_brand: jsonAsset.p_brand,
					p_name: jsonAsset.p_name,
					price: jsonAsset.price,
					time: jsonAsset.time,
					p_thumbnail_image: product.p_thumbnail_image
				})
			} finally {
				gateway.disconnect();
			}
		} catch (error) {
			console.error(`******** FAILED to run the application: ${error}`);
			process.exit(1);
		}
	}

	return res.render('o_asset', { assets, header: 'header', footer: 'footer', })
}

const GetListOrder = async (req, res, next) => {
	const currentUser = req.session.user || req.cookies.user;
	const user = await UserBase.findOne({ _id: currentUser._id }).lean()
	const orders = []

	if (user.orders === 0) {
		res.render('o_index')
		return
	}

	for (const orderId of user.orders) {
		let tmp = await OrderBase.findOne({ _id: orderId }).lean();
		orders.push(tmp)
	}

	res.render('o_index', { orders, header: 'header', footer: 'footer', })
}

const PostOrder = async (req, res, next) => {
	const result = validationResult(req);

	/**
	 * -- Tasks --
	 * Update product quantity of product
	 * Change state of cart: isCheckout -> true (deprecated)
	 * Empty items in cart
	 * Create new order
	 * Update the orders property of user
	 * -- Tasks --	
	 * -- New tasks --
	 * Update the p_assetID of product (shift)
	 * Update owner from webname to username on blockchain network
	 * Update assets of user
	 * -- New tasks --
	 */
	if (result.isEmpty()) {
		const currentUser = req.session.user || req.cookies.user;
		const cart = await CartBase.findOne({ owner: currentUser._id }).lean();
		const user = await UserBase.findOne({ _id: currentUser._id }).lean()
		let arrayAssetsPaid = user.assets
		let orders = user.orders

		// Get all items in cart
		for (const o of cart.product_and_quantity) {
			let product = await ProductBase.findOne({ _id: o.pid }).lean()

			if (product.p_quantity - o.quantity > 0) {
				let i = 0

				while (i < o.quantity) {
					let tmp = product.p_assetID.shift()
					arrayAssetsPaid.push(tmp)
					i++
				}

				// Update quantity's product
				// Update the p_assetID of product (shift)
				await ProductBase.findOneAndUpdate(
					{ _id: o.pid },
					{
						p_quantity: product.p_quantity - o.quantity,
						p_assetID: product.p_assetID,
					},
					{ new: true }
				);

				// Update owner from webname to username on blockchain network
				try {
					const gateway = new Gateway();

					try {
						await gateway.connect(ccp, {
							wallet,
							identity: org1UserId,
							discovery: { enabled: true, asLocalhost: true },
						});

						const network = await gateway.getNetwork(channelName);

						const contract = network.getContract(chaincodeName);

						for (const assetID of arrayAssetsPaid) {
							await contract.submitTransaction('TransferAsset', assetID, currentUser.username);
						}
					} finally {
						gateway.disconnect();
					}
				} catch (error) {
					console.error(`******** FAILED to run the application: ${error}`);
					process.exit(1);
				}

				// Update assets of user
				const newUSer = await UserBase.findOneAndUpdate(
					{ _id: currentUser._id },
					{ assets: arrayAssetsPaid },
					{ new: true }
				)
			}
		}

		// Create new order
		let newOrder = await OrderBase.create({ product_and_quantity: cart.product_and_quantity })

		// Update the orders property of user
		orders.push(newOrder._id)

		// Update the orders property of user
		await UserBase.findOneAndUpdate(
			{ _id: currentUser._id },
			{ orders },
			{ new: true }
		);

		// Empty items in cart
		await CartBase.findOneAndUpdate(
			{ owner: currentUser._id },
			{ product_and_quantity: [] },
			{ new: true }
		);


		return res.status(200).json({ message: 'Đặt hàng thành công!', OK: true, redirectTo: '/' });
	}

	return next(createError(404, 'Oops! Error in function PostOrder (User Controller)!'));
};

const GetOrder = async (req, res, next) => {
	const result = validationResult(req);
	if (req.session.cartRoute) delete req.session.cartRoute;

	if (result.isEmpty()) {
		const { p_id } = matchedData(req);

		const currentUser = req.session.user || req.cookies.user;

		if (currentUser !== undefined) {

			const cart = await CartBase.findOne({ owner: currentUser._id }).lean()

			if (cart != null) {
				let itemsInCartVM = []
				const itemsInCart = cart.product_and_quantity

				for (const item of itemsInCart) {
					let product = await ProductBase.findOne({ _id: item.pid }).lean()

					itemsInCartVM.push({
						p_id: product.p_id,
						p_name: product.p_name,
						p_quantity: item.quantity,
						p_price: product.p_price,
						p_thumbnail_image: product.p_thumbnail_image
					})
				}

				res.render('order', { itemsInCartVM, header: 'header', footer: 'footer', });
				return;
			}

			res.render('order', { header: 'header', footer: 'footer', });
			return;
		} else {
			req.session.isLogin = false
			req.session.orderRoute = true

			if (p_id !== undefined) {
				const filter = { p_id };

				const found = await ProductBase.findOne(filter).lean();

				if (!found) {
					req.session.error_404 = `Please check your ID for the product again!`;
					return next(createError(404, `Error! The product with id=${p_id} does not exist!`));
				}

				res.redirect(`/product/${found.p_id}`)
				return;
			} else {
				await authentication(req, res, next);
			}
		}
	}

	return next(createError(404, 'Oops! Error in function GetOrder (User Controller)!'));
};

const PostCart = async (req, res, next) => {
	const result = validationResult(req);

	if (result.isEmpty()) {
		let { p_id, pQty, inCartPage, delFlag, btn_bn } = matchedData(req);
		console.log(p_id);
		console.log(pQty);
		console.log(btn_bn);
		const filter = { p_id };
		pQty = Number(pQty)

		const found = await ProductBase.findOne(filter).lean();
		console.log(found);
		const brand = await BrandBase.findOne({ _id: found.brand_id }).lean();
		const currentUser = req.session.user || req.cookies.user;
		const existedCart = await CartBase.findOne({ owner: currentUser._id }).lean();

		if (!found) {
			req.session.error_404 = `Please check your ID for the product again!`;
			return next(createError(404, `Error! The product with id=${id} does not exist!`));
		}

		let product_and_quantity = []

		if (existedCart === null) {
			// create a new one
			pQty === 1 ?
				product_and_quantity.push({ pid: found._id }) :
				product_and_quantity.push({ pid: found._id, quantity: pQty })

			await CartBase.create({ product_and_quantity, owner: currentUser._id })

			if (btn_bn) {
				return res.status(200).json({ message: 'Thêm vào giỏ hàng thành công', OK: true, redirectTo: '/user/order' });
			}

			return res.status(200).json({ message: 'Thêm vào giỏ hàng thành công', OK: true, qtyInCart: 1 });
		} else {
			let inCart = false;
			// console.log(inCartPage);

			if (inCartPage) {
				// change value only
				for (const o of existedCart.product_and_quantity) {
					// console.log(o.pid);
					// console.log(found._id);

					if (found._id.toString() === o.pid.toString()) {
						inCart = true
						// update quantity of existed product
						o.quantity = pQty
					}
				}

				await CartBase.findOneAndUpdate(
					{ _id: existedCart._id },
					{ product_and_quantity: existedCart.product_and_quantity },
					{ new: true }
				);

				return res.status(200).json({ message: 'Cập nhật giỏ hàng thành công', OK: true });
			} else if (delFlag) {
				for (let i = 0; i < existedCart.product_and_quantity.length; i++) {
					if (found._id.toString() === existedCart.product_and_quantity[i].pid.toString()) {
						existedCart.product_and_quantity.splice(i, 1);
						// decrement i so the next iteration won't skip an item
						i--;
					}
				}

				// console.log(existedCart.product_and_quantity);

				await CartBase.findOneAndUpdate(
					{ _id: existedCart._id },
					{ product_and_quantity: existedCart.product_and_quantity },
					{ new: true }
				);

				return res.status(200).json({ message: 'Cập nhật giỏ hàng thành công', OK: true });
			} else {
				// insert existed cart
				for (const o of existedCart.product_and_quantity) {
					// console.log(o.pid);
					// console.log(found._id);

					if (found._id.toString() === o.pid.toString()) {
						inCart = true
						// update quantity of existed product
						o.quantity += pQty
					}
				}

				if (!inCart) {
					// add a new one
					product_and_quantity = existedCart.product_and_quantity
					pQty === 1 ?
						product_and_quantity.push({ pid: found._id }) :
						product_and_quantity.push({ pid: found._id, quantity: pQty })
				}

				await CartBase.findOneAndUpdate(
					{ _id: existedCart._id },
					{ product_and_quantity: existedCart.product_and_quantity },
					{ new: true }
				);

				const cart = await CartBase.findOne({ owner: currentUser._id }).lean();
				const qtyInCart = cart.product_and_quantity.length;

				if (btn_bn) {
					return res.status(200).json({ message: 'Thêm vào giỏ hàng thành công', OK: true, redirectTo: '/user/order' });
				}

				return res.status(200).json({ message: 'Thêm vào giỏ hàng thành công', OK: true, qtyInCart });
			}
		}
	}

	return next(createError(404, 'Oops! Error in function PostCart (User Controller)!'));
};

const GetCart = async (req, res, next) => {
	const result = validationResult(req);
	if (req.session.orderRoute) delete req.session.orderRoute;

	if (result.isEmpty()) {
		const { p_id } = matchedData(req);
		const currentUser = req.session.user || req.cookies.user;

		if (currentUser !== undefined) {
			const cart = await CartBase.findOne({ owner: currentUser._id }).lean()

			if (cart != null) {
				let itemsInCartVM = []
				const itemsInCart = cart.product_and_quantity

				for (const item of itemsInCart) {
					let product = await ProductBase.findOne({ _id: item.pid }).lean()
					// console.log(product);
					itemsInCartVM.push({
						p_id: product.p_id,
						p_name: product.p_name,
						p_quantity: item.quantity,
						p_price: product.p_price,
						p_thumbnail_image: product.p_thumbnail_image
					})
				}

				res.render('cart', { itemsInCartVM, header: 'header', footer: 'footer', });
				return;
			}

			res.render('cart', { header: 'header', footer: 'footer', })
			return
		} else {
			req.session.isLogin = false
			req.session.cartRoute = true

			if (p_id !== undefined) {
				const filter = { p_id };

				const found = await ProductBase.findOne(filter).lean();

				if (!found) {
					req.session.error_404 = `Please check your ID for the product again!`;
					return next(createError(404, `Error! The product with id=${p_id} does not exist!`));
				}

				res.redirect(`/product/${found.p_id}`)
				return;
			} else {
				await authentication(req, res, next);
			}
		}
	}

	return next(createError(404, 'Oops! Error in function GetCart (User Controller)!'));
};

const GetIndex = async (req, res, next) => {
	res.send('respond with a resource');
};

const userController = {
	GetIndex,
	GetCart,
	PostCart,
	GetOrder,
	PostOrder,
	GetListOrder,
	GetOrderDetail,
	GetListAsset
};

export default userController;
