import { Router } from "express";
import { getMeController } from "../controllers/user.controller";

const router = Router();

router.get("/me", getMeController);

export default router;