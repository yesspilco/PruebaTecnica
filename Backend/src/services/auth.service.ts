import { UserRepository } from "../repositories/user.repository";
import { hashPassword } from "../utils/hash";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { RegisterUserDTO, UserResponseDTO } from "../models/user.dto";
import e from "express";


export class AuthService {
  private userRepo = new UserRepository();

  async register(data: RegisterUserDTO): Promise<UserResponseDTO> {
    const { name, email, password } = data;

    // Validaciones
    if (!name || !email || !password) {
      throw new Error("Ingrese todos los campos requeridos");
    }

    if (password.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }

    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new Error("El email ya se encuentra registrado");
    }

    const user = await this.userRepo.createUser(data);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    };
  }

  async login(email: string, password: string): Promise<{ token: string; user: Partial<User> }> {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Usuario o contraseña incorrectos");
    }

    // Crear JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    // Retornar solo campos seguros
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return { token, user: safeUser };
  }
 
}