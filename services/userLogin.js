
const decryptPassword = require('../utils/decryptPassword');


const userLogin = async (req,res) =>{


    try
    {
        if ( !req.body["password"] || !req.body['firstName'] || !req.body['lastName']){
            return res.json("data not found. Aborted");
        }
        
        const User = req.app.get("models").User;
    

        console.log("password received "+req.body["password"] );

        const userToLogin =   await User.findOne({
                                                    'firstName':req.body['firstName'],
                                                    'lastName':req.body['lastName']
                                                 });  //   await User.findById(req.body._id);

        console.log("user to login infos : "+userToLogin);
        if ( userToLogin == undefined || !userToLogin)
        {
            return res.json("user not found");
        }

        console.log("password to check : "+req.body["password"]);
        console.log("user to login infos : "+userToLogin.firstName);
        console.log("user to login token : "+userToLogin['token']);
        console.log("user to login salt  : "+userToLogin.salt);
        console.log("user to login hash  : "+userToLogin.hash);

        const token = decryptPassword(userToLogin,req.body["password"]) ;



        if ( token === null)
        {
            return res.json("password is invalid");
        }

        return res.json(token);

        
        await userToUpdate.save();
        return res.json(userToUpdate);

        
    } 
    catch (error) 
    {
            res.json(error.message);
    }

}

module.exports = userLogin;