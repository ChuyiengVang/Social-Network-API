const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// POPULATE???

module.exports = {
    // API/thoughts
  async getThoughts (req, res) {
    try {
        const thoughtData = await Thought.find()
        .populate({path: "reactions", select: "-__v"});

        res.json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
  },

  async getSingleThought (req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
        .populate({path: "reactions", select: "-__v"});

      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought with that ID' });
      };
  
      res.json(thoughtData)
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async createThought (req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      const userData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughtData._id } },
        { runValidators: true, new: true },
      );

      if (!userData) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
      }

      res.json('Created the thought 🎉');
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought (req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true },
      );

      if (!thoughtData) {
        return res.status(404).json({ message: 'No thoughts with this id!' });
      }

      res.json(thoughtData);
    } catch (err) {
        res.status(500).json(err);
      }
  },

  async deleteThought (req, res) {
    try {
      const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
      
      if (!thoughtData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      const userData = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { runValidators: true, new: true },
      );

      if (!userData) {
        return res.status(404).json({
          message: 'Thought deleted but no user with this id!',
        });
      }

      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // API/thoughts

  // api/thoughts/:thoughtId/reactions
  async createReaction (req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true },
      );

      if (!reactionData) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(reactionData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeReaction (req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true },
      );

      if (!reactionData) {
        return res.status(404).json({ message: 'No reaction with this id!' });
      }

      res.json(reactionData); 
    } catch (err) {
      res.status(500).json(err);
    }
  }, 
    // api/thoughts/:thoughtId/reactions

}