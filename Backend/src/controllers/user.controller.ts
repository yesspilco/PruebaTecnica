import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserResponseDTO } from "../models/user.dto";

const userService = new UserService();

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

    const user = await userService.update(userId, { name });

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