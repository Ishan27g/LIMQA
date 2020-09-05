const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");



const PORT = 8080;

const userRoutes = require('./routes/user-routes');
const HttpError = require('./models/http-error');

const app = express();
app.use(bodyParser.json());
//init mongoDB
//require('./src/db');
app.use('/users', userRoutes);


app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
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
mongoose
  .connect('mongodb+srv://qunzhi:test123@cluster0.7wtff.mongodb.net/e-portfolio?retryWrites=true&w=majority')
  .then(() => {
      app.listen(PORT);
  })
  .catch(err => {
      console.log(err);
  });


