const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//checkBody Middleware

exports.getAllTours = async (req, res) => {
	try {
		//BUILD QUERY
		//1A) filtering

		const queryObj = { ...req.query };
		const excludedQuery = ['sort', 'fields', 'page', 'limit'];
		excludedQuery.forEach(el => delete queryObj[el]);

		//1B) Advanced filtering
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

		console.log(JSON.parse(queryStr));
		let query = Tour.find(JSON.parse(queryStr));

		//2) Sorting

		const sortBy = req.query.sort.split(',').join(' ');
		console.log(req.query.sort);
		if (req.query.sort) {
			query = query.sort(sortBy);
		} else {
			query = query.sort('-createdAt');
		}

		//3) Field Limiting
		if (req.query.fields) {
			const fields = req.query.fields.split(',').join(' ');
			query = query.select(fields);
		} else {
			query = query.select('-__v');
		}

		//4) Pagination
		const page = req.query.page * 1 || 1;
		const limit = req.query.page * 1 || 100;
		const skip = (page - 1) * limit;

		query = query.skip(skip).limit(limit);

		if (req.query.page) {
			const numTours = await Tour.countDocuments();
			if (skip >= numTours) throw new Error('This page does not exist ');
		}

		//EXECUTE QUERY
		const tours = await query;

		// const query =  Tour.find()
		// 	.where('duration')
		// 	.equals(5)
		// 	.where('difficulty')
		// 	.equals('easy');

		//SEND RESPONSE
		res.status(200).json({
			status: 'OK',
			result: tours.length,
			data: { tours },
		});
	} catch (err) {
		res.status(500).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.getTour = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id);
		// Tour.findOne({_id:req.params.id})
		console.log(tour);
		if (!tour) {
			return res.status(404).json({
				status: 'Not Found-1',
				message: err,
			});
		}
		res.status(200).json({
			status: 'OK',
			data: { tour },
		});
	} catch (err) {
		return res.status(404).json({
			status: 'Not Found',
			message: err,
		});
	}
};

// const tour = tours.find((el) => el.id === +req.params.id);

// if (!tour) {
//

exports.createNewTour = async (req, res) => {
	try {
		const newTour = await Tour.create(req.body);

		res.status(201).json({
			status: 'success',
			data: { tour: newTour },
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: 'Invalid data send!',
		});
	}
};

exports.updateTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: 'OK',
			data: tour,
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};

exports.deleteTour = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (error) {
		res.status(404).json({
			status: 'fail',
			message: error,
		});
	}
};
