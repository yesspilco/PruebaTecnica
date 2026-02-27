import { Router } from "express";
import { loginController } from "../controllers/auth.controller";
import{registerController} from "../controllers/auth.controller";

const router = Router();


router.post("/register", registerController);
router.post("/login", loginController);

export default router;