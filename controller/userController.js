const GetOrder = async (req, res, next) => {
	res.render('order');
};

const GetCart = async (req, res, next) => {
	res.render('cart');
};

const GetIndex = async (req, res, next) => {
	res.send('respond with a resource');
};

const userController = {
	GetIndex,
	GetCart,
	GetOrder
};

export default userController;
