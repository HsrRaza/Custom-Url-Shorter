

export const erroHandler = (err , req , res , next)=>{
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
    console.error(err);
    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    })
    
}










// errors/customErrors.js
export class AppError extends Error {
    constructor(message, statusCode=500, ) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Specific error types for your URL shortener
export class ValidationError extends AppError {
    constructor(message = 'Invalid input data') {
        super(message, 400);
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message = 'Resource already exists') {
        super(message, 409);
    }
}

export class RateLimitError extends AppError {
    constructor(message = 'Too many requests') {
        super(message, 429);
    }
}

export class ShortCodeGenerationError extends AppError {
    constructor(message = 'Failed to generate short code') {
        super(message, 500);
    }
}

export class URLAccessError extends AppError {
    constructor(message = 'URL is not accessible') {
        super(message, 422);
    }
}

export class InvalidURLError extends AppError {
    constructor(message = 'Invalid URL format') {
        super(message, 400);
    }
}

