export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;   
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}