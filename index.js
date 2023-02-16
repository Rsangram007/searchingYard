const express = require('express');
const route = require('./router/router.js');
const mongoose = require('mongoose');
const app = express();

const multer = require("multer")
const PORT = process.env.PORT || 3000

app.use(express.json());

app.use(multer().any())
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://Rsangram890:hPZbgpmJvegZil8Q@cluster0.osqcdhn.mongodb.net/Jaykisan?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"), err => console.log(err))


app.use('/', route);


app.listen(PORT, function () {
    console.log('Express app running on port ' + PORT)
});
