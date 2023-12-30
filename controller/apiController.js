import { Gateway, Wallets } from 'fabric-network';
import FabricCAServices from 'fabric-ca-client';

import createError from 'http-errors';
import { validationResult, matchedData } from 'express-validator';

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


const GetExistAssetById = async (req, res, next) => {
	const result = validationResult(req);

	if (result.isEmpty()) {
		const { asset_id } = matchedData(req)
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

				let result = await contract.evaluateTransaction('AssetExists', asset_id);

				res.status(200).json(JSON.parse(result))
				return
			} finally {
				gateway.disconnect();
			}
		} catch (error) {
			console.error(`******** FAILED to run the application: ${error}`);
			process.exit(1);
		}
	}

	return next(createError(404, 'Something went wrong in GetExistAssetById (Api Controller)'));
}

const GetDeleteAssetById = async (req, res, next) => {
	const result = validationResult(req);

	if (result.isEmpty()) {
		const { asset_id } = matchedData(req)
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

				let result = await contract.submitTransaction('DeleteAsset', asset_id);

				res.status(200).json({ status: 200, OK: true, message: 'Xóa thành công asset ID = ' + asset_id })
				return
			} finally {
				gateway.disconnect();
			}
		} catch (error) {
			console.error(`******** FAILED to run the application: ${error}`);
			process.exit(1);
		}
	}

	return next(createError(404, 'Something went wrong in GetAssetById (Api Controller)'));
}
const GetAssetById = async (req, res, next) => {
	const result = validationResult(req);

	if (result.isEmpty()) {
		const { asset_id } = matchedData(req)
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

				res.status(200).json(JSON.parse(result))
				return
			} finally {
				gateway.disconnect();
			}
		} catch (error) {
			console.error(`******** FAILED to run the application: ${error}`);
			process.exit(1);
		}
	}

	return next(createError(404, 'Something went wrong in GetAssetById (Api Controller)'));
};

const GetIndex = async (req, res, next) => {
	try {
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

			let result = await contract.evaluateTransaction('GetAllAssets');
			res.status(200).json(JSON.parse(result))
			return
		} finally {
			gateway.disconnect();
		}
	} catch (error) {
		console.error(`******** FAILED to run the application: ${error}`);
		process.exit(1);
	}
};

const apiController = {
	GetIndex,
	GetAssetById,
	GetDeleteAssetById,
	GetExistAssetById
};

export default apiController;
