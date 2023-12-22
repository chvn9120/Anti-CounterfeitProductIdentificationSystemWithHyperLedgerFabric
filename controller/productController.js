import createError from 'http-errors';
import { validationResult, matchedData } from 'express-validator'

import ProductBase from '../models/product.js'
import BrandBase from '../models/brand.js'

const GetProductById = async (req, res, next) => {
	const result = validationResult(req);

	if (result.isEmpty()) {
		const { id } = matchedData(req);
		const filter = { p_id: id };

		const found = await ProductBase.findOne(filter).lean();
		const brand = await BrandBase.findOne({ _id: found.brand_id }).lean();

		if (!found) {
			req.session.error_404 = `Please check your ID for the product again!`;
			return next(createError(404, `Error! The roduct with id=${id} does not exist!`));
		}

		req.session.product = found;
		const currentUser = req.session.user || req.cookies.user;

		res.render('p_detail', {
			product: found,
			brand,
			user: currentUser,
			header: 'header',
			footer: 'footer'
		});
		return;
	}

	return next(createError(404, 'Oops! Error in function GetProductById (Product Controller)!'));
};

const productController = {
	GetProductById,
};

export default productController;
