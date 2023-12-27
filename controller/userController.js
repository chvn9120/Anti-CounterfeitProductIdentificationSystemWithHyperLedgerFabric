import { validationResult, matchedData } from 'express-validator'
import createError from 'http-errors';

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

		res.render('o_detail', { order, products })
		return
	}

	return next(createError(404, 'Oops! Error in function GetOrderDetail (User Controller)!'));
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

	res.render('o_index', { orders })
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
	 */
	if (result.isEmpty()) {
		const currentUser = req.session.user || req.cookies.user;
		const cart = await CartBase.findOne({ owner: currentUser._id }).lean();
		const user = await UserBase.findOne({ _id: currentUser._id }).lean()
		let orders = user.orders


		// Get all items in cart
		for (const o of cart.product_and_quantity) {
			// Update quantity's product
			let product = await ProductBase.findOne({ _id: o.pid }).lean()

			if (o.quantity - product.p_quantity > 0) {
				await ProductBase.findOneAndUpdate(
					{ _id: o._id },
					{ p_quantity: o.quantity - product.p_quantity },
					{ new: true }
				);
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

		return res.status(200).json({ message: 'Thanh toán thành công!', OK: true, redirectTo: '/' });
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

				res.render('order', { itemsInCartVM });
				return;
			}

			res.render('order');
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

				res.render('cart', { itemsInCartVM });
				return;
			}

			res.render('cart')
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
	GetOrderDetail
};

export default userController;
