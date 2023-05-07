const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//checkBody Middleware

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'OK',
    // data: { tour: '<Updated tour...>' },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'OK',
    data: null,
  });
};
