/**
 * errorHandler - Function to handle errors
 * it takes statusCode and message as parameters and returns an error object with the given status code and message
 */
export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};