const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
    const authorizationHeaderValue = req.headers["authorization"];
    req.user = null;
    if (
        !authorizationHeaderValue ||
        !authorizationHeaderValue.startsWith("Bearer")
    )
        return next();
    const token = authorizationHeaderValue.split("Bearer ")[1];
    req.user = getUser(token);
    return next();
}

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
