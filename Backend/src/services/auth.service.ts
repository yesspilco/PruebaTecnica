import { UserRepository } from "../repositories/user.repository";
import { hashPassword } from "../utils/hash";
import { RegisterUserDTO, UserResponseDTO } from "../models/user.dto";


export class AuthService {
  private userRepo = new UserRepository();

async register(data: RegisterUserDTO): Promise<UserResponseDTO> {
  const { name, email, password } = data;

  // Validaciones
  if (!name || !email || !password) {
    throw new Error("Todos los campos son obligatorios");
  }

  if (password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres");
  }

  const existingUser = await this.userRepo.findByEmail(email);
  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  const hashedPassword = await hashPassword(password);

  const user = await this.userRepo.createUser({
    name,
    email,
    password: hashedPassword
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
  };
}
 
}