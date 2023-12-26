import { validationResult, matchedData } from 'express-validator'
import createError from 'http-errors';

import authentication from '../middlewares/authentication.js';

import ProductBase from '../models/product.js';
import BrandBase from '../models/brand.js';
import CartBase from '../models/cart.js';

const PostOrder = async (req, res, next) => {
	const result = validationResult(req);

	if (result.isEmpty()) {
		const { p_id, pQty } = matchedData(req);
		/**Tasks
		 * Update product quantity of product
		 * Change state of cart: isCheckout -> true
		 * Update list order of user
		 */

		// console.log(p_id, pQty);
		return
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
		let { p_id, pQty, inCartPage, delFlag } = matchedData(req);
		const filter = { p_id };
		pQty = Number(pQty)

		const found = await ProductBase.findOne(filter).lean();
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
			}
			else {
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
};

export default userController;
