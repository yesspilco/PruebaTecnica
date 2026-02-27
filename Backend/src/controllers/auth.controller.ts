import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import {RegisterUserDTO} from "../models/user.dto";
const authService = new AuthService();

export const registerController = async (req: Request, res: Response) => {
  try {
    const userData: RegisterUserDTO = req.body;
    const user = await authService.register(userData);
    res.status(201).json({ message: "Usuario registrado exitosamente", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};