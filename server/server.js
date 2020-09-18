const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const dns = require('dns');
const os = require('os');
const passport = require("passport");
const session = require("express-session");
dotenv.config();


//init mongoDB
//require('./src/db');


const PORT = 8080;

const userRoutes = require('./routes/user-routes');

const manageRoutes = require('./routes/manage-routes');
const HttpError = require('./models/http-error');


const app = express();

require("./config/passport")(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Express session middleware
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.user = req.user || null;
    console.log(res.locals.login);
    next();
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT');
    next();
});


// Routes
app.use('/api/users', userRoutes);
app.use('/api', manageRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if(req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err)
        });
    }
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});

/*app.get('/',(res, rsp) => {
    rsp.send('E-Portfolio')
})
app.listen(PORT, () => {
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        console.log(`Express server listening on `+ add + `:${PORT}`)
     })
})*/



// mongodb environment variables
const {
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PORT
} = process.env;
// Connection URL
const url =`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}`;

// Use connect method to connect to MongoDB after a safe delay as it takes time to install mongoDB in docker for the first time. Can remove delay after 1st run.
// no need for delay if running mongoDb locally
setTimeout(connect, 10000);

function connect(){
    mongoose
    //.connect('mongodb+srv://qunzhi:test123@cluster0.7wtff.mongodb.net/e-portfolio?retryWrites=true&w=majority')
        .connect(url)
    .then(() => {
        console.log("Connected to mongoDB")
        app.listen(PORT, () => {
            dns.lookup(os.hostname(), function (err, add, fam){
                console.log(`Express server listening on `+ add + `:${PORT}`)
            })
         })
    })
    .catch(err => {
        console.log(err);
    });

}
