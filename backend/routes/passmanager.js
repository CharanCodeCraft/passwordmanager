const express = require('express');
const router = express.Router(); 
const User = require('../model/user');
const errorhandler = require('../middlewares/errormiddleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authmiddleware = require('../middlewares/authmiddleware');
const dotenv = require('dotenv');
dotenv.config();

router.get('/test', (req, res) => {
    res.json({
        message: "API is working"
    });
}
);
router.get('/', authmiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userid);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.passwords);
  } catch (err) {
    console.error("Error fetching passwords:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

  //post
router.post('/', authmiddleware, async (req, res) => {
    try {
      console.log("Saving password:", req.body);
      const newPassword = req.body; // { site, username, password, id }
  
      // Validate structure
      if (!newPassword.site || !newPassword.username || !newPassword.password || !newPassword.id) {
        return res.status(400).json({ message: 'Incomplete password data' });
      }
  
      // Update the user's password array
      const updatedUser = await User.findByIdAndUpdate(
        req.userid,
        { $push: { passwords: newPassword } },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(201).json({ message: 'Password saved successfully', passwords: updatedUser.passwords });
    } catch (err) {
      console.error('Error saving password:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  //delete
  router.delete('/', authmiddleware, async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).json({ message: "Password ID is required" });
  
      const updatedUser = await User.findByIdAndUpdate(
        req.userid,
        { $pull: { passwords: { id } } },
        { new: true }
      );
  
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json({ message: "Password deleted successfully", passwords: updatedUser.passwords });
    } catch (err) {
      console.error("Error deleting password:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

module.exports=router