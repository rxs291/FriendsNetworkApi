const { ObjectId } = require('mongoose').Types;
const { Thought, User, Reaction } = require('../models'); 



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

      let newThought = {
        thoughtText: `${req.body.thoughtText}`,
        username: `${req.body.username}`
      }
      const thought = await Thought.create(newThought)

      if (!thought) {
        return res.status(500).json({ message: 'Could not create thought' });
      }

      const user = await User.findOneAndUpdate(
        { _id: req.body.userID },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );


      res.json({ thought, user });
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
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(400).json({ message: "No thought with that ID" })
      }
      res.json(thought);
    } catch (err) {
      res.satus(500).json(err);
    }
  },
  async addReaction(req, res) {
    console.log('You are adding an a reaction');
    console.log(req.body); 
    
    try {
      
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      console.log(thought)

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}