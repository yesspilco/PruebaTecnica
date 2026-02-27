import { Router } from "express";
import { getUserIdController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { updateUserController } from "../controllers/user.controller";
import { getAllUsersController } from "../controllers/user.controller";

const router = Router();

router.get("/me", authMiddleware, getUserIdController);
router.put("/me", authMiddleware, updateUserController);
router.get("/", authMiddleware, adminMiddleware, getAllUsersController);
export default router;