
const encryptPassword = require('../utils/encryptPassword');
const decryptPassword = require('../utils/decryptPassword');

async function userCreate(req,res){

try{
    if( !req.body['password'] ){
        return res.json("no password. Aborted...");
    }

    const encryptedPassword = encryptPassword(req.body["passord"]);

    const User = req.app.get("models").User;

 const body = req.body;

    const NewUser = await new User(
        {
            firstName:body.firstName,
            lastName:body.lastName,
            dateOfBirth: body.dateOfBirth,
            token: encryptedPassword['token'],
            salt: encryptedPassword['salt'],
            hash: encryptedPassword['hash'],
        }).save();
    res.json("user created succesfully :"+NewUser);
    } catch (error) {
        res.json(error.message);
    }

}

async function userDelete(req,res){

    try
    {
        if ( !req.body._id){
            return res.json("id not found. Aborted");
        }

        const User = req.app.get("models").User;
    

        console.log("id received "+req.body._id);
        const userToDelete = await User.findById(req.body._id);

        if (!userToDelete)
        {
            return res.json("user not found");
        }
        else
        {
            console.log("Result : ", userToDelete);
            
        }
        await userToDelete.remove();
        return res.json("Susccessfully remove User");
        
    } 
    catch (error) 
    {
            res.json(error.message);
    }
    
    }


async function userGet(req,res){

    try{
        const User = req.app.get("models").User;
    
        const myUser = await User.find();
        res.json(myUser);
        } catch (error) {
            res.json(error.message);
        }
    
    }

async function userUpdate(req,res)
{
   try
    {
        if ( !req.body._id || !req.body.toModify ){
            return res.json("id or data not found. Aborted");
        }
        
        const User = req.app.get("models").User;
    

        console.log("id received "+req.body._id);
        console.log("modify received "+req.body.toModify);
        const userToUpdate = await User.findById(req.body._id);

        if (!userToUpdate)
        {
            return res.json("user not found");
        }
        else
        {
            console.log("Result : ", userToUpdate);
            const keysToUpdate =  Object.keys(req.body.toModify);
            console.log(keysToUpdate);
            for(const key of keysToUpdate)
            {
                userToUpdate[key] = req.body.toModify[key];
            }
        }
        await userToUpdate.save();
        return res.json(userToUpdate);

        
    } 
    catch (error) 
    {
            res.json(error.message);
    }
}

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

        }
        await userToUpdate.save();
        return res.json(userToUpdate);

        
    } 
    catch (error) 
    {
            res.json(error.message);
    }

}

module.exports = { userCreate,userGet,userDelete, userUpdate, userLogin};