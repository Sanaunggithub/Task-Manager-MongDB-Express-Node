const asyncWrapper = (fn) =>{
    // return a new function because express expects a function with (req, res, next) parameters
    return async (req, res, next) =>{
        try {
            await fn(req, res, next) // Call the passed function with req, res, next. pass next here just in case i might need it.
        } catch (error){
            next(error) // Pass the error to the next middleware (error-handler middleware)
        }
    }
}

module.exports = asyncWrapper