
const decryptPassword = require('../utils/decryptPassword');


const userLogin = async (req,res) =>{


    try
    {
        if ( !req.body["password"] || !req.body['firstName'] || !req.body['lastName']){
            return res.json("data not found. Aborted");
        }
        
        const User = req.app.get("models").User;
    

        console.log("password received "+req.body["password"] );
        console.log("firstName received "+req.body["firstName"] );
        console.log("lastName received "+req.body["lastName"] );

        const userToLogin = await User.find({
                                                'firstName':req.body["firstName"],
                                                'lastName':req.body["lastName"]
                                            });

        if (!userToLogin)
        {
            return res.json("user not found");
        }
        else
        {
            console.log("password to check : "+req.body["password"]);
            console.log("user to login infos : "+userToLogin);

            token = decryptPassword(userToLogin['token'],userToLogin['salt'],userToLogin['hash'],req.body["password"]) ;

            if ( token === null)
            {
                return res.json("password is invalid");
            }

            return res.json(token);

        }
        await userToUpdate.save();
        return res.json(userToUpdate);

        
    } 
    catch (error) 
    {
            res.json(error.message);
    }

}

module.exports = userLogin;