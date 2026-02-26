import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";
import { OK_200 } from "../constants/messages";
import { CodigosHttpEnum } from "../enums/codigosHttp.enum";
import {
  ErrorLogI,
  ServiceResponseI,
} from "../interfaces/service-response.interface";

/**
 * Create structure for response api rest.
 * @param {ServiceResponseI} objServiceResponse - Api Rest object.
 * @return "Response with structure {"data":any | null, "message": string}"
 */
export const serviceResponse = async (objServiceResponse: ServiceResponseI) => {
  objServiceResponse.res.statusCode = objServiceResponse.statusCode ?? 200;
  if (objServiceResponse.statusCode! >= CodigosHttpEnum.badRequest) {
    const data = {
      errorMessage: objServiceResponse.message,
      errorCode: objServiceResponse.res.statusCode,
      url: objServiceResponse.req.originalUrl,
      method: objServiceResponse.req.method,
      params: objServiceResponse.req.params,
      query: objServiceResponse.req.query,
      body: objServiceResponse.req.body,
      headers: objServiceResponse.req["headers"],
    } as ErrorLogI;
  }
  return objServiceResponse.res.json({
    data: objServiceResponse.data ?? null,
    message: objServiceResponse.message ?? OK_200,
  });
};

/**
 * Wrap para obtener errores de validation (express-validation)
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const wrapErrorValidation = (
  err: unknown,
  _req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof ValidationError) {
    const objServiceResponse: ServiceResponseI = {
      statusCode: err.statusCode,
      data: null,
      res,
      req: _req,
      message: "",
    };
    let msj: string[] = [];
    if (err.details.body) {
      msj = err.details.body?.map((e) => e.message);
    }
    if (err.details.query) {
      msj = err.details.query?.map((e) => e.message);
    }
    msj?.forEach((element) => {
      objServiceResponse.message += element;
    });
    return serviceResponse(objServiceResponse);
  }

  return res.status(500).json(err);
};
