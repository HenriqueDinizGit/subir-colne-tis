import { Request, Response, NextFunction } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { ZodError } from "zod";
import { BadRequestException } from "./exceptions/bad-requests";
import { log } from "console";

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (error: any) {
            let exception: HttpException;

            if (error instanceof HttpException) {
                exception = error;
            } else if (error instanceof ZodError) {
                console.log(error);
                exception = new BadRequestException("Entidade não processável", ErrorCode.UNPROCESSABLE_ENTITY);
            } else {
                console.log(error);
                exception = new InternalException("Algo deu errado no nosso sistema", error, ErrorCode.INTERNAL_EXCEPTION);
            }

            next(exception);
        }
    };
};
