import { pool } from "../config/database/postgres";
import { User } from "../models/user.model";
import { hashPassword } from "../utils/hash";

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query<User>(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0] || null;
  }

  async findById(id: number): Promise<User | null> {
    const result = await pool.query<User>(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  }

 async createUser(data: { name: string; email: string; password: string; role?: string }) {
    const { name, email, password, role = "user" } = data;
    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING id, name, email, role, created_at`,
      [name, email, hashedPassword, role]
    );

    return result.rows[0];
  }

  async updateUser(id: number, name: string) {
  const result = await pool.query(
    `UPDATE users SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [name, id]
  );
  return result.rows[0];
}

async findAllUsers() {
  const result = await pool.query("SELECT id, name, email, role FROM users");
  return result.rows;
}
}