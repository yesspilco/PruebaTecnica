import { Request, Response, NextFunction } from "express";
import { ValidationError } from "express-validation";
import { ServiceResponseI } from "../interfaces/service-response.interface";
import { serviceResponse } from "./responseHelper";

export const wrapperError = async (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (
    ["ForbiddenException", "HttpException", "AuthenticationException"].includes(
      err.constructor.name
    )
  ) {
    const objServiceResponse: ServiceResponseI = {
      statusCode: err.statusCode,
      data: null,
      res,
      req: _req,
      message: err.constructor.name,
    };
    return serviceResponse(objServiceResponse);
  } else if (err instanceof ValidationError) {
    const message = Object.values(err.details)
      .reduce((a, v) => {
        a.push(...v.map((i: { message: unknown }) => i.message));
        return a;
      }, [])
      .join(" ");
    const objServiceResponse: ServiceResponseI = {
      statusCode: err.statusCode,
      data: null,
      res,
      req: _req,
      message: message,
    };
    return serviceResponse(objServiceResponse);
  } else {
    return res.status(500).json(err);
  }
};
