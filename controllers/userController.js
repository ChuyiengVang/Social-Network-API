const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// POPULATE???

module.exports = {
    // /API/USERS
  async getUsers (req, res) {
    try {
      const userData = await User.find()
      // Mongoose automatically looks for the plural, lowercased version of your model name
      // path targets model "Thought" not keyword "thoughts" in User model
      .populate({path: "thoughts", select: "-__v"})
      .populate({path: 'friends', select: "-__v"});

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser (req, res) {
    try {
        const userData = await User.findOne({ _id: req.params.userId })
        .populate({path: "thoughts", select: "-__v"})
        .populate({path: 'friends', select: "-__v"});

        if (!userData) {
          return res.status(404).json({ message: 'No user with that ID' });
        };

        res.json(userData)
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser (req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser (req,res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
        
      if (!userData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser (req, res) {
    try {
      const userData = await User.findOneAndRemove(
        { _id: req.params.userId }
      );

      if (!userData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      await Thought.deleteMany({ _id: { $in: userData.thoughts } });
      res.json({ message: 'User and associated thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // /API/USERS

  // /API/USERS/:USERID/FRIENDS/:FRIENDID
  async addFriend (req, res) {
    try {
      const friendData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true },
      );

      if (!friendData) {
        return res.status(404).json({ message: 'Could not add friend' });
      }

      res.json({ message: 'Friend successfully added!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteFriend  (req, res) {
    try {
      const friendData = await User.findOneAndRemove(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true },
      );

      if (!friendData) {
        return res.status(404).json({ message: 'Could not delete friend' });
      }

      res.json({ message: 'Friend successfully deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  }
   // /API/USERS/:USERID/FRIENDS/:FRIENDID
};