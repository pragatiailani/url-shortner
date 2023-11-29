const { getUser } = require("../services/auth");

// AUTHENTICATION
function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if (
        !tokenCookie
    )
        return next();
    req.user = getUser(tokenCookie);
    return next();
}

// AUTHORIZATION
function restrictTo(roles) {
    return function (req, res, next) {
        if (!req.user) return res.redirect("/login");

        if (!roles.includes(req.user.role)) return res.end("Unauthorized");

        next();
    };
}

module.exports = {
    checkForAuthentication,
    restrictTo,
};
