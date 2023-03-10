const express = require('express');

const mongoose = require('mongoose');

const models = require('./models');

mongoose.connect("mongodb://localhost/sportCentersTuto").catch(error => console.log('error'+error));

const app = express();

app.set("models",models);

const userRoute = require("./routes/user");
const getRoleMiddleWare = require('./utils/getRoleMiddleWare');

app.use(express.json());
app.use(getRoleMiddleWare);

userRoute(app);

app.listen(3000, () => {
    console.log("server succesfully launched");
})