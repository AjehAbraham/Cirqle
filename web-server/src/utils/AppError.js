export class AppError extends Error {
	constructor(message, statusCode, code = 'GENERIC_ERROR') {
		super(message);
		this.statusCode = statusCode;
		this.code = code;
		this.isOperational = true; // PREDICTABLE ERROR NOT BUG

		Error.captureStackTrace(this, this.constructor);
	}
}

export BadRequestError extends AppError{
	constructor(message, statusCode, code = "BAD_REQUEST_ERROR"){
		super(message, 400, code);
	}
}

export UnauthorizedError extends AppError{
	constructor(message, statusCode, code = "UNAUTHORIZED_ERROR"){
		super(message, 401, code);
	}
}

export ForbiddenError extends AppError{
	constructor(message, statusCode, code = "FORBIDDEN"){
		super(message, 403, code);
	}
}

export NotFoundError extends AppError{
	constructor(message, statusCode, code = "NOT_FOUND_ERROR"){
		super(message, 404, code);
	}
}

export ConflictError extends AppError{
	constructor(message, statusCode, code = "CONFLICT_ERROR"){
		super(message, 409, code);
	}
}


export ValidationError extends AppError{
	constructor(message, statusCode, code = "VALIDATION_ERROR"){
		super(message, 422, code);
	}
}

export TooManyRequestsError extends AppError{
	constructor(message, statusCode, code = "TOO_MANY_REQUEST"){
		super(message, 429,? code);
	}
}

export InternalServerError extends AppError{
	constructor(message, statusCode, code = "INTERNAL_SERVER_ERROR"){
		super(message, 500, code);
	}
}
