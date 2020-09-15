module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/users/login');
        //console.log("cannot go to manage page.")
    }
}