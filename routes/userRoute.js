import express from "express";
import { deleteUser, followUser, getUser, unFollowUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get('/:id', getUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)
    .put('/:id/follow', followUser)
    .put('/:id/unfollow', unFollowUser)

export default router