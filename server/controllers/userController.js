const User = require('../models/User');

const UserController = {
  // Create a new user
  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      const newUser = new User({ username, email });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Error creating user');
    }
  },

  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching users');
    }
  },

  // Get a single user by ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).send('Error fetching user');
    }
  },

  // Update a user
  updateUser: async (req, res) => {
    try {
      const { username, email } = req.body;
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email }, { new: true });
      if (updatedUser) {
        res.json(updatedUser);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Error updating user');
    }
  },

  // Delete a user
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (deletedUser) {
        res.json(deletedUser);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Error deleting user');
    }
  }
};

module.exports = UserController;
