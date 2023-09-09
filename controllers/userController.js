import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
// get User

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(400).json("No such User exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a user

export const updateUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentAdminStatus, password } = req.body;

  if (id === currentUserId || currentAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile");
  }
};

// delete user

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentAdminStatus } = req.body;

  if (id === currentUserId || currentAdminStatus) {
    try {
      await userModel.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only Delete your own profile");
  }
};

// Follow a User
export const followUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action Forbidden! you cannot follow yourself");
  } else {
    try {
      const followUser = await userModel.findById(id);
      const followingUser = await userModel.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed");
      } else {
        res.status(403).json("User is already followed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

// UnFollow a User
export const unFollowUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.status(403).json("Action Forbidden! you cannot unfollow yourself");
  } else {
    try {
      const followUser = await userModel.findById(id);
      const followingUser = await userModel.findById(currentUserId);

      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User Unfollowed");
      } else {
        res.status(403).json("User is unfollowed by you");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
