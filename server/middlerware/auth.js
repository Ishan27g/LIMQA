/*
    this middle ware validates the login status. if user is not logged in,
    it will redirect user to login page. 
    if user is logged in, users can perform the request they want.
*/
module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/users/login');
        console.log("cannot go to this page, log in first.")
    }
};