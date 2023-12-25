import createError from 'http-errors';
import { validationResult, matchedData } from 'express-validator'

import ProductBase from '../models/product.js'
import BrandBase from '../models/brand.js'
import CartBase from '../models/cart.js';

const GetProductById = async (req, res, next) => {
	const result = validationResult(req);

	if (result.isEmpty()) {
		const { id } = matchedData(req);
		const filter = { p_id: id };

		const found = await ProductBase.findOne(filter).lean();

		if (!found) {
			req.session.error_404 = `Please check your ID for the product again!`;
			return next(createError(404, `Error! The product with id=${id} does not exist!`));
		}

		const brand = await BrandBase.findOne({ _id: found.brand_id }).lean();

		req.session.product = found;
		const currentUser = req.session.user || req.cookies.user;
		const cart = await CartBase.findOne({ owner: currentUser._id }).lean();
		let qtyInCart;
		if (cart !== null) {
			qtyInCart = cart.product_and_quantity.length;
		}

		if (currentUser !== undefined) {
			res.render('p_detail', {
				product: found,
				brand,
				user: currentUser,
				qtyInCart,
				header: 'header',
				footer: 'footer'
			});
		} else {
			if (req.session.isLogin) {
				res.render('p_detail', {
					product: found,
					brand,
					user: currentUser,
					qtyInCart,
					header: 'header',
					footer: 'footer'
				});
			} else {
				if (req.session.orderRoute) {
					res.render('p_detail', {
						product: found,
						brand,
						displayModal: true,
						orderFunc: true,
						header: 'header',
						footer: 'footer'
					});
				} else if (req.session.cartRoute) {
					res.render('p_detail', {
						product: found,
						brand,
						displayModal: true,
						cartFunc: true,
						header: 'header',
						footer: 'footer'
					});
				} else {
					res.render('p_detail', {
						product: found,
						brand,
						header: 'header',
						footer: 'footer'
					});
				}
			}
		}

		return;
	}

	return next(createError(404, 'Oops! Error in function GetProductById (Product Controller)!'));
};

const productController = {
	GetProductById,
};

export default productController;
