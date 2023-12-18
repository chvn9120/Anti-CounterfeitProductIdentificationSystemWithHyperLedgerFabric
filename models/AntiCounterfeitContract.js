import { Contract } from 'fabric-contract-api';

export default class AntiCounterfeitContract extends Contract {
	async initLedger(ctx) {
		// Initialize the ledger with some products
		const products = [
			{ id: 'PRODUCT1', name: 'Product 1', manufacturer: 'Manufacturer 1', isVerified: true },
			{ id: 'PRODUCT2', name: 'Product 2', manufacturer: 'Manufacturer 2', isVerified: false },
			// Add more products as needed
		];

		for (const product of products) {
			await ctx.stub.putState(product.id, Buffer.from(JSON.stringify(product)));
		}
	}

	async queryProduct(ctx, productId) {
		// Query the ledger for a specific product
		const productAsBytes = await ctx.stub.getState(productId);
		if (!productAsBytes || productAsBytes.length === 0) {
			throw new Error(`The product ${productId} does not exist`);
		}
		return productAsBytes.toString();
	}

	async createProduct(ctx, productId, productDetails) {
		// Create a new product on the ledger
		const product = JSON.parse(productDetails);
		await ctx.stub.putState(productId, Buffer.from(JSON.stringify(product)));
	}

	async verifyProduct(ctx, productId) {
		// Verify the authenticity of a product
		const productAsBytes = await ctx.stub.getState(productId);
		if (!productAsBytes || productAsBytes.length === 0) {
			throw new Error(`The product ${productId} does not exist`);
		}
		const product = JSON.parse(productAsBytes.toString());
		product.isVerified = true;
		await ctx.stub.putState(productId, Buffer.from(JSON.stringify(product)));
	}
}
