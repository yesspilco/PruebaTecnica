import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { KEY_JWT, TIME_JWT } from "../constants/enviroment";
import { ERR_401 } from "../constants/messages";
import { ServiceResponseI } from "../interfaces/service-response.interface";
import { LoginUserI } from "../interfaces/user.interface";
import { serviceResponse } from "./responseHelper";

export class JwtHelper {
  /**
   * Create jwt string
   * @param payload
   * @returns string
   */
  create(payload: object): string {
    return jwt.sign({ data: { ...payload } }, KEY_JWT, {
      expiresIn: TIME_JWT,
    });
  }

  /**
   * Valid token and return payload objetc
   * @param token
   * @returns any
   */
  validate(token: string): any | null {
    try {
      return jwt.verify(token, KEY_JWT) as any;
    } catch (error) {
      return null;
    }
  }
}

export const validateJwtHeader = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const objServiceResponse: ServiceResponseI = {
    res,
    req: req,
    statusCode: 401,
    message: ERR_401,
  };
  const jwtHelper = new JwtHelper();
  if (!authHeader) return serviceResponse(objServiceResponse);
  const token = authHeader.split("Bearer ")[1];
  const payload = jwtHelper.validate(token);
  if (payload) {
    next();
  } else {
    return serviceResponse(objServiceResponse);
  }
};
