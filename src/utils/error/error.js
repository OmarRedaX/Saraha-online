
export const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => {
            return next(new Error(error, { cause: 500 }));
        });
    }
}

export const globalErrorHandler = (err, req, res, next) => {

    if (process.env.MOOD == "DEV"){
        return res.status(err.cause || 400).json({error: err, error: err.message, stack: err.stack });
    }

    return res.status(err.cause || 400).json({error: err, error: err.message});
    
}