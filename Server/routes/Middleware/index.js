function authentication(req, res, next) {
    var user = req.headers['user'];
    var password = req.headers['pwd'];
    if((user === 'af5ff2a549c2090a382151614def2a3e')&&(password ==='b77a38ec4b8caea8569894d2e56577df')){
        next();
    }
    else{
        const error = new Error('Not Found - ' + req.originalUrl);
        res.status(404);
        res.status(res.statusCode || 500);
        res.json({
            message: error.message,
            error: process.env.NODE_ENV === 'production' ? {} : error.stack,
        });
    }
}
function notFound(req, res, next) {
    const error = new Error('Not Found - ' + req.originalUrl);
    res.status(404);
    next(error);
}

function errorHandler(error, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message: error.message,
        error: process.env.NODE_ENV === 'production' ? {} : error.stack,
    });
}

module.exports = {
    authentication,
    notFound,
    errorHandler
};