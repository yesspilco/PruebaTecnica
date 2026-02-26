import { UserRole } from "./user.model";

export interface RegisterUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  created_at: Date;
}