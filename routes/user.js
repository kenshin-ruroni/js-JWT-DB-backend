

const usersGet = require('../services/getUsers');

const userCreate = require('../services/userCreate');

const userDelete = require('../services/userDelete');

const userLogin = require('../services/userLogin');

const userUpdate = require('../services/userUpdate');

function userRoute(app){

    // create
    app.post("/userCreate",userCreate);
    app.get("/users",usersGet);
    app.post("/userDelete",userDelete);
    app.post('/userUpdate',userUpdate);
    app.post('/userLogin',userLogin);

};

module.exports  = userRoute;