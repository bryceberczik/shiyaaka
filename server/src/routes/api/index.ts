import { Router } from "express";
import { userRouter } from './userRoutes.js';
import { categoryRouter } from './categoryRoutes.js';
import { clothingRouter } from "./clothingRoutes.js";

const router = Router();

router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/clothing', clothingRouter);

export default router;