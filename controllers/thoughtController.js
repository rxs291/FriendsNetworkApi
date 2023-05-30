const { ObjectId } = require('mongoose').Types;
const { Thought } = require('../models');
const { User } = require('../models')


module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      console.log(req.body)
      console.log(req.body.thoughtText)
      let newThought = {
        thoughtText: `${req.body.thoughtText}`,
        username: `${req.body.username}`
      }
      const thought = await Thought.create(newThought)

      if (!thought) {
        return res.status(500).json({ message: 'Could not create thought' });
      }

      let addThought = thought._id;
      console.log(addThought)

      const user = await User.findOneAndUpdate(
        { _id: req.body.userID },
        { $addToSet: { thoughts: thought } },
        { new: true }
      );



      res.json({  thought, user });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(400).json({ message: "No thought with that ID" })
      }
      res.json(thought);
    } catch (err) {
      res.satus(500).json(err);
    }
  },
}