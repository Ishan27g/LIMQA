const express = require('express');
const app = express();
const PORT = 8080;

//init mongoDB
require('./src/db');


app.get('/',(res, rsp) => {
    rsp.send('E-Portfolio ')
})
app.listen(PORT, () => {
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        console.log(`Express server listening on `+ add + `:${PORT}`)
     })
})
