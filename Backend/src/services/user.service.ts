import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private userRepo = new UserRepository();

  /**
   * Obtener usuario por ID
   */
  async getById(userId: number) {
    if (!userId) {
      throw new Error("ID de usuario inválido");
    }

    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  }

  /**
   * Listar usuarios (admin)
   */
  // async getAll() {
  //   return await this.userRepo.findAll();
  // }

  /**
   * Actualizar perfil
   */
  async updateUser(
    userId: number,
    name: string
  ) {
    if (!name) {
      throw new Error("El nombre es obligatorio");
    }

    return await this.userRepo.updateUser(userId, name);
  }


  async getAllUsers(role: string) {
  if (role !== "admin") {
    throw new Error("Acceso denegado: solo admin puede listar usuarios");
  }
  const users = await this.userRepo.findAllUsers();
  return users;
}
}

