import express from "express";
import { deleteUser, followUser, getUser, unFollowUser, updateUser, getAllUsers } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authmiddleware.js";


const router = express.Router();

router.get('/', getAllUsers)
    .get('/:id', getUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)
    .put('/:id/follow', followUser)
    .put('/:id/unfollow', unFollowUser)

export default router