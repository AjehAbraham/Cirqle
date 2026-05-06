
export class AppError extends Error{
    constructor(message, statusCode, code){
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends AppError{
    constructor(message, statusCode, code= "BAD_REQUEST_ERROR"){
        super(message, 400, code);
    }
}
export class UnAuthorizedError extends AppError{
    constructor(message, statusCode, code ="UNAUTHORIZED"){
        super(message, 401, code);
    }
}
export class ForbiddenError extends AppError{
    constructor(message, statusCode, code= "FORBIDDEN"){
        super(message, 403, code);
    }
}
export class NotFoundError extends AppError{
    constructor(message, statusCode, code = "NOT_FOUND"){
        super(message, 404, code);
    }
}
export class ConflictError extends AppError{
    constructor(message, statusCode, code= "CONFLICT_ERROR"){
        super(message, 409, code);
    }
}
export class ValidationError extends AppError{
    constructor(message, statusCode, code= "VALIDATION_ERROR"){
        super(message, 422, code);
    }
}
export class TooManyRequestError extends AppError{
    constructor(message, statusCode, code= "TOO_MANY_REQUEST"){
        super(message, 429, code);
    }
}
export class InternalServerError extends AppError{
    constructor(message, statusCode, code ="INTERNAL_ERROR"){
        super(message, 500, code);
    }
}