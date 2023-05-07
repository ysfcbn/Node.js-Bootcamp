const express = require('express');
const {
  getAllTours,
  createNewTour,
  getTour,
  updateTour,
  deleteTour,
  checkTourID,
  checkBody,
} = require('./../controllers/tourController.js');
const router = express.Router();

// router.param('id', checkTourID);

router.route('/').get(getAllTours).post(createNewTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
