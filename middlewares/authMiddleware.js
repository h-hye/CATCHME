const authMiddleware = (req, res, next) => {
    if (req.session.userId) {
        return next();
    } else {
        res.redirect('/');
    }
};

module.exports = authMiddleware;