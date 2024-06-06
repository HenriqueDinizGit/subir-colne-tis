export class HttpException extends Error {
  message: string;
  errorCode: any;
  statusCode: number;
  errors: ErrorCode;

    constructor(message: string, errorCode: ErrorCode, statusCode: number, errors: any) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }

}


export enum ErrorCode{
    USER_NOT_FOUND = '1001',
    USER_ALREADY_EXISTS = '1002',
    USER_OR_INCORRECT_PASSWORD = '1003',
    UNAUTHORIZED = '1004',
    INTERNAL_EXCEPTION = '1005',
    TREINO_NOT_FOUND = '1006',
    EXERCICIO_NOT_FOUND = '1007',
    UNPROCESSABLE_ENTITY = '1008',
    SHARED_TREINO_NOT_FOUND = '1009',
    INVALID_TOKEN = '1010',
    MEMBROS_NOT_FOUND = '1011',
    COMUNNITY_NOT_FOUND = '1012',
    NOT_ALL_PARAMETERS_PROVIDED = '1013',
    TREINOS_FINALIZADOS_NOT_FOUND = '1014',
} 