import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private userRepo = new UserRepository();

  /**
   * Obtener usuario por ID
   */
  async getById(userId: string) {
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
  async update(
    userId: string,
    data: { name?: string }
  ) {
    if (!data.name) {
      throw new Error("El nombre es obligatorio");
    }

    return await this.userRepo.updateUser(userId, data);
  }
}