const encryptPassword = require('../utils/encryptPassword');

async function userCreate(req,res){

try{
    if( !req.body['password'] ){
        return res.json("no password. Aborted...");
    }

    const body = req.body;
    console.log("password received "+body["password"]);

    const encryptedPassword = encryptPassword(body["password"]);

    const User = req.app.get("models").User;



    let dateOfBirth = body['dateOfBirth'];

    if ( dateOfBirth === undefined )
    {
        dateOfBirth = new Date();
        console.log("no date found set to "+dateOfBirth);
    }

    const NewUser = await new User(
        {
            firstName:body.firstName,
            lastName:body.lastName,
            dateOfBirth: dateOfBirth,
            token: encryptedPassword['token'],
            salt: encryptedPassword['salt'],
            hash: encryptedPassword['hash'],
        }).save();
    res.json("user created succesfully :"+JSON.stringify(NewUser));
    } catch (error) {
        res.json(error.message);
    }

}

module.exports = userCreate;