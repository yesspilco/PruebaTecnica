import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../constants/enviroment";

export class BcryptHelper {
  encrypt = async (password: string) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
  };

  compare = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
  };
}
