import { pool } from "../config/database/postgres";
import { User } from "../models/user.model";

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query<User>(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    return result.rows[0] || null;
  }

  async findById(id: string): Promise<User | null> {
    const result = await pool.query<User>(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  }

async createUser(data: { name: string; email: string; password: string }): Promise<User> {
  const result = await pool.query<User>(
    `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [data.name, data.email, data.password]
  );

  return result.rows[0];
}

   async updateUser(
    id: string,
    data: { name?: string }
  ): Promise<User | null> {
    const result = await pool.query<User>(
      `
      UPDATE users
      SET
        name = COALESCE($1, name),
        updated_at = NOW()
      WHERE id = $2
      RETURNING *
      `,
      [data.name ?? null, id]
    );

    return result.rows[0] || null;
  }
}