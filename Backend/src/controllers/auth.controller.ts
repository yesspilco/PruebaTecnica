import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export const registerController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await authService.register(req.body);

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};