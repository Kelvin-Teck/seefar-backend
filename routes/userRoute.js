import express from "express";
import { deleteUser, followUser, getUser, unFollowUser, updateUser, getAllUsers } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authmiddleware.js";


const router = express.Router();

router.get('/', getAllUsers)
    .get('/:id', getUser)
    .put('/:id', authMiddleware, updateUser)
    .delete('/:id', authMiddleware, deleteUser)
    .put('/:id/follow', authMiddleware, followUser)
    .put('/:id/unfollow', authMiddleware, unFollowUser)

export default router