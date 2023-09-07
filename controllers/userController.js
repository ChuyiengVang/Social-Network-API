const { ObjectId } = require('mongoose').Types;
const User = require('../models/User');

module.exports = {
    // /API/USERS
  async getUsers (req, res) {
    try {
      const userData = await User.find();
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser (req, res) {
    try {
        const userData = await User.findOne({ _id: req.params.userId })
          .select('-__v');

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
        return res.status(404).json({ message: 'No video with this id!' });
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

      res.json(userData);
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
          { // $addToSet? 23-Subdoc-Population }
        )
    }
  }

}