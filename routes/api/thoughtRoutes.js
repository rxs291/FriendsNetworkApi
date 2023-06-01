const router = require('express').Router();

const {
  getThoughts,
  createThought,
  getSingleThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction

} = require('../../controllers/thoughtController');


// /api/thoughts/
router.route('/').get(getThoughts).post(createThought)

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought)

addReaction
// /api/thoughts/:thoughtId/reaction
router.route('/:thoughtId/reaction').post(addReaction)

// /api/thoughts/:thoughtId/reaction
router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction);

module.exports = router;
