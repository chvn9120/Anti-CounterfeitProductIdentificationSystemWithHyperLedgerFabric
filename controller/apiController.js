const datas = [
	{
		ID: 'asset1',
		Color: 'blue',
		Size: 5,
		Owner: 'Tomoko',
		AppraisedValue: 300,
	},
	{
		ID: 'asset2',
		Color: 'red',
		Size: 5,
		Owner: 'Brad',
		AppraisedValue: 400,
	},
	{
		ID: 'asset3',
		Color: 'green',
		Size: 10,
		Owner: 'Jin Soo',
		AppraisedValue: 500,
	},
	{
		ID: 'asset4',
		Color: 'yellow',
		Size: 10,
		Owner: 'Max',
		AppraisedValue: 600,
	},
	{
		ID: 'asset5',
		Color: 'black',
		Size: 15,
		Owner: 'Adriana',
		AppraisedValue: 700,
	},
	{
		ID: 'asset6',
		Color: 'white',
		Size: 15,
		Owner: 'Michel',
		AppraisedValue: 800,
	},
];

const GetIndex = async (req, res, next) => {
	res.render('test', { jsonData: datas });
};

const apiController = {
	GetIndex,
};

export default apiController;
