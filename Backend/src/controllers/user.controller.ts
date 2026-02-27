import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserResponseDTO } from "../models/user.dto";
import { UserRepository } from "../repositories/user.repository";

const userService = new UserService();
const userRepo = new UserRepository();
/**
 * GET /api/users/me
 * Usuario autenticado
 */
export const getMeController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.body?.id;

    if (!userId) {
      return res.status(401).json({
        message: "No autorizado",
      });
    }

    const user: UserResponseDTO = await userService.getById(userId);

    return res.json(user);
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};

/**
 * PUT /api/users/me
 * Actualizar perfil
 */
export const updateMeController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.body?.id;
    const { name } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "No autorizado",
      });
    }

    const user = await userService.updateUser(userId, name );

    return res.json({
      message: "Perfil actualizado",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: (error as Error).message,
    });
  }
};

/**
 * GET /api/users
 * Solo admin
 */
// export const getUsersController = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     if (req.body?.role !== "admin") {
//       return res.status(403).json({
//         message: "Acceso denegado",
//       });
//     }

//     const users = await userService.getAll();

//     return res.json({ users });
//   } catch (error) {
//     return res.status(400).json({
//       message: (error as Error).message,
//     });
//   }
// };

export const getUserIdController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const userId = req.user.id;
    const user = await userRepo.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Solo devolver campos seguros
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json(safeUser);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "No autorizado" });
    const { name } = req.body;
    const user = await userService.updateUser(req.user.id, name);
    res.status(200).json({ message: "Perfil actualizado", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const users = await userService.getAllUsers(req.user.role);

    return res.status(200).json({ users });
  } catch (error: any) {
    return res.status(403).json({ message: error.message });
  }
};