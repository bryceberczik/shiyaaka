import express from "express";
const router = express.Router();

import {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} from "../../controllers/userController.js";

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

export { router as userRouter };
