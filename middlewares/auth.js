const { getUser } = require("../services/auth");

function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.headers["authorization"];
    if (!userUid) return res.redirect("/login");

    const token = userUid.split("Bearer ")[1]; //"Bearer a2nkljadf" => ["", "a2nkljadf"]
    const user = getUser(token);
    
    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

function checkAuth(req, res, next) {
    const userUid = req.headers["authorization"];
    
    const token = userUid.split("Bearer ")[1]; //"Bearer a2nkljadf" => ["", "a2nkljadf"]
    const user = getUser(token);
    
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserOnly, checkAuth
};
