'use strict';
import { Gateway, Wallets } from 'fabric-network';
import FabricCAServices from 'fabric-ca-client';
import { validationResult, matchedData } from 'express-validator';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
// import { v2 as cloudinary } from 'cloudinary';


import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// import { buildCAClient, registerAndEnrollUser, enrollAdmin } from '../../fabric-samples/test-application/javascript/CAUtil.js';
// import { buildCCPOrg1, buildCCPOrg2, buildWallet } from '../../fabric-samples/test-application/javascript/AppUtil.js';

const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'basic';

const mspOrg1 = 'Org1MSP';
const walletPath = join(__dirname, '../wallet');
const org1UserId = 'javascriptAppUser';

// cloudinary.config({
// 	cloud_name: process.env.CLOUDINARY_NAME,
// 	api_key: process.env.CLOUDINARY_KEY,
// 	api_secret: process.env.CLOUDINARY_SECRET,
// });

import UserBase from '../models/user.js';
import BrandBase from '../models/brand.js';
import ProductBase from '../models/product.js';

import seedData from '../utils/seedData.js';
import adminAccount from '../credentials.js';
import mongoose from '../utils/mongoose.js';
import { promiseHooks } from 'v8';

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

const GetAssetTransfer = async (req, res, next) => {
	try {
		// build an in memory object with the network configuration (also known as a connection profile)
		const ccp = buildCCPOrg1();

		// build an instance of the fabric ca services client based on
		// the information in the network configuration
		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

		// setup the wallet to hold the credentials of the application user
		const wallet = await buildWallet(Wallets, walletPath);

		// in a real application this would be done on an administrative flow, and only once
		await enrollAdmin(caClient, wallet, mspOrg1);

		// in a real application this would be done only when a new user was required to be added
		// and would be part of an administrative flow
		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

		// Create a new gateway instance for interacting with the fabric network.
		// In a real application this would be done as the backend server session is setup for
		// a user that has been verified.
		const gateway = new Gateway();

		try {
			// setup the gateway instance
			// The user will now be able to create connections to the fabric network and be able to
			// submit transactions and query. All transactions submitted by this gateway will be
			// signed by this user using the credentials stored in the wallet.
			await gateway.connect(ccp, {
				wallet,
				identity: org1UserId,
				discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
			});

			// Build a network instance based on the channel where the smart contract is deployed
			const network = await gateway.getNetwork(channelName);
			// console.log(network);

			// Get the contract from the network.
			const contract = network.getContract(chaincodeName);

			// Initialize a set of asset data on the channel using the chaincode 'InitLedger' function.
			// This type of transaction would only be run once by an application the first time it was started after it
			// deployed the first time. Any updates to the chaincode deployed later would likely not need to run
			// an "init" type function.
			// console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
			// await contract.submitTransaction('InitLedger');
			// console.log('*** Result: committed');

			// Let's try a query type operation (function).
			// This will be sent to just one peer and the results will be shown.
			// console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
			let result = await contract.evaluateTransaction('GetAllAssets');
			// console.log(result);
			res.status(200).json(JSON.parse(result))
			return
			// console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// Now let's try to submit a transaction.
			// This will be sent to both peers and if both peers endorse the transaction, the endorsed proposal will be sent
			// to the orderer to be committed by each of the peer's to the channel ledger.
			// console.log('\n--> Submit Transaction: CreateAsset, creates new asset with ID, color, owner, size, and appraisedValue arguments');
			// let result = await contract.submitTransaction('CreateAsset', 'asset317', 'yellow', '5', 'Tom', '1300');
			// console.log('*** Result: committed');
			// if (`${result}` !== '') {
			// 	console.log(`*** Result: ${prettyJSONString(result.toString())}`);
			// }
			// res.status(200).json(JSON.parse(result))
			// return

			// console.log('\n--> Evaluate Transaction: ReadAsset, function returns an asset with a given assetID');
			// result = await contract.evaluateTransaction('ReadAsset', 'asset313');
			// console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// console.log('\n--> Evaluate Transaction: AssetExists, function returns "true" if an asset with given assetID exist');
			// result = await contract.evaluateTransaction('AssetExists', 'asset1');
			// console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// console.log('\n--> Submit Transaction: UpdateAsset asset1, change the appraisedValue to 350');
			// await contract.submitTransaction('UpdateAsset', 'asset1', 'blue', '5', 'Tomoko', '350');
			// console.log('*** Result: committed');

			// console.log('\n--> Evaluate Transaction: ReadAsset, function returns "asset1" attributes');
			// result = await contract.evaluateTransaction('ReadAsset', 'asset1');
			// console.log(`*** Result: ${prettyJSONString(result.toString())}`);

			// try {
			// How about we try a transactions where the executing chaincode throws an error
			// Notice how the submitTransaction will throw an error containing the error thrown by the chaincode
			// console.log('\n--> Submit Transaction: UpdateAsset asset70, asset70 does not exist and should return an error');
			// await contract.submitTransaction('UpdateAsset', 'asset70', 'blue', '5', 'Tomoko', '300');
			// console.log('******** FAILED to return an error');
			// } catch (error) {
			// console.log(`*** Successfully caught the error: \n    ${error}`);
			// }

			// console.log('\n--> Submit Transaction: TransferAsset asset1, transfer to new owner of Tom');
			// await contract.submitTransaction('TransferAsset', 'asset1', 'Tom');
			// console.log('*** Result: committed');

			// console.log('\n--> Evaluate Transaction: ReadAsset, function returns "asset1" attributes');
			// result = await contract.evaluateTransaction('ReadAsset', 'asset1');
			// console.log(`*** Result: ${prettyJSONString(result.toString())}`);
		} finally {
			// Disconnect from the gateway when the application is closing
			// This will close all connections to the network
			gateway.disconnect();
		}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
		process.exit(1);
	}
};

const PostRegister = async (req, res, next) => {
	const result = validationResult(req);

	if (result.isEmpty()) {
		const { username, password, confirm_password } = matchedData(req);

		if (password !== confirm_password) {
			req.session.flash_error = {
				message: `Your password and confirm password aren't matched!`,
				type: 'danger',
			};

			res.redirect('/register')
			return
		}

		const existedUser = await UserBase.findOne({ username });

		if (existedUser) {
			req.session.flash_success = {
				message: 'User had already existed!',
				type: 'danger',
			};

			res.redirect('/register');
			return
		}

		const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
		await UserBase.create({ username, password: hashedPassword, });

		res.redirect('/login');
		return;
	}

	return next(createError(404, 'Something went wrong in PostRegister (Index Controller)'));
};

const GetRegister = async (req, res, next) => {
	if (req.session.flash_error != null) {
		res.locals.flash = req.session.flash_error;
		delete req.session.flash_error;
	}

	if (req.session.flash_success != null) {
		res.locals.flash = req.session.flash_success;
		delete req.session.flash_success;
	}

	res.render('register');
}

const PostLogin = async (req, res, next) => {
	const result = validationResult(req);

	if (result.isEmpty()) {
		const { username, password, isRemember } = matchedData(req);
		const maxAge = 30 * 24 * 60 * 60 * 1000;

		const currentUser = await UserBase.findOne({ username });

		const matched = await bcrypt.compare(password, currentUser.password);

		if (!matched || !currentUser) return next(createError(422, 'Your username or password was wrong!'));

		if (isRemember === undefined) {
			// not store on cookie.
			req.session.user = currentUser;
			req.session.cookie.maxAge = 3 * 60 * 60 * 1000; // Valid in 3 hours
		} else {
			res.cookie('user', { username }, { maxAge, httpOnly: true });
		}

		req.session.flash_success = {
			message: `Login successfully! Welcome back <b>${username}</b>!`,
			type: 'success',
		};

		res.redirect('/');
		return;
	}

	return next(createError(404, 'Something went wrong in PostLogin (Index Controller)'));
};

const GetLogin = async (req, res, next) => res.render('login');

const GetLogout = (req, res, next) => {
	if (req.session.cookie.maxAge) req.session.destroy();
	if (req.cookies.user) res.clearCookie('user');

	res.redirect('/login');
	return
};


const GetIndex = async (req, res, next) => {
	/* Seed admin account */
	const admin = await UserBase.findOne({ username: adminAccount.username });

	if (!admin) {
		await UserBase.create({
			username: adminAccount.username,
			fullname: `N.V.C Huy`,
			password: await bcrypt.hash(adminAccount.password, await bcrypt.genSalt(10)),
			avatar: '/images/default-avt.jpg',
			role: 'admin',
		});

		// Professional solution
		// cloudinary.uploader.upload('./public/images/default-avt.jpg').then(async (response) => {
		// 	await UserBase.create({
		// 		username: adminAccount.username,
		// 		fullname: `N.V.C Huy`,
		// 		email: `${adminAccount.username}@gmail.com`,
		// 		password: await bcrypt.hash(adminAccount.username, await bcrypt.genSalt(10)),
		// 		avatar: response.secure_url,
		// 		role: 'admin',
		// 		isLoggedIn4TheFirstTime: true,
		// 		isChangedPassword4TheFirstTime: true,
		// 	});
		// });
	}
	/* Seed admin account */

	/* Seed brands */
	const sizeOfTblBrandBase = (await BrandBase.find({})).length;

	if (sizeOfTblBrandBase === 0) {
		for (const brand of seedData.seedsBrand) {
			await BrandBase.create({
				brand_name: brand.brand_name,
				display_brand_name: brand.display_brand_name,
				brand_desc: brand.brand_desc,
				createdBy: admin._id,
				createdAt: Date.now()
			});
		}
	}
	/* Seed brands */

	/* Seed products */
	const sizeOfTblProductBase = (await ProductBase.find({})).length;

	if (sizeOfTblProductBase === 0) {
		for (const brand_name in seedData.shoes) {
			const found = await BrandBase.findOne({ brand_name });

			if (!found) {
				req.session.error_404 = `Brand with name is "${brand_name}" not found!`;
				return next(createError(404, ` Error in function GetIndex (Index Controller)!`));
			}

			let newProduct = null

			for (const i in seedData.shoes[brand_name]) {
				const response = await fetch(`${seedData.shoes[brand_name][i]}`);
				const product = await response.json();

				product.short_description.trim() === '...'
					? newProduct = new ProductBase({
						p_id: product.id,
						p_name: product.name.trim(),
						p_desc: product.description,
						p_price: product.price,
						p_thumbnail_image: product.thumbnail_url,
						brand_id: found._id,
						brand_name: found.brand_name,
						createdBy: admin._id,
					})
					: newProduct = new ProductBase({
						p_id: product.id,
						p_name: product.name.trim(),
						p_desc: product.short_description,
						p_price: product.price,
						p_thumbnail_image: product.thumbnail_url,
						brand_id: found._id,
						brand_name: found.brand_name,
						createdBy: admin._id,
					});

				await newProduct.save();
			}
		}
	}
	/* Seed products */

	if (req.session.flash_error != null) {
		res.locals.flash = req.session.flash_error;
		delete req.session.flash_error;
	}

	if (req.session.flash_success != null) {
		res.locals.flash = req.session.flash_success;
		delete req.session.flash_success;
	}

	const brands = await BrandBase.find({});
	const products = await ProductBase.find({});

	res.render('index', {
		title: 'DROL YAG',
		header: 'header',
		footer: 'footer',
		brands: mongoose.multipleMongoose2Obj(brands),
		products: mongoose.multipleMongoose2Obj(products),
	});

	////////////////////// SUCK ////////////////////////////////////////
	////////////////////////////////////////////////////////////////////
	// let products;

	// try {
	// 	let { page, size, sort, brand } = matchedData(req)

	// 	if (!page) page = 1;


	// 	if (!size) size = 8;


	// 	let limit = parseInt(size);

	// 	if (brand !== undefined) {
	// 		products = await ProductBase.find({ brand_name: brand })
	// 			.sort({ _id: -1 }).limit(limit);
	// 	} else {
	// 		products = await ProductBase.find({})
	// 			.sort({ _id: -1 }).limit(limit);
	// 	}

	// 	res.render('index', {
	// 		title: 'DROL YAG',
	// 		header: 'header',
	// 		footer: 'footer',
	// 		brands: mongoose.multipleMongoose2Obj(brands),
	// 		products: mongoose.multipleMongoose2Obj(products),
	// 	});
	// }
	// catch (error) {
	// 	return next(createError(error));
	// }
	////////////////////////////////////////////////////////////////////
}

const indexController = {
	GetIndex,
	GetLogin,
	GetLogout,
	PostLogin,
	GetRegister,
	PostRegister,
	GetAssetTransfer,
};

export default indexController;
