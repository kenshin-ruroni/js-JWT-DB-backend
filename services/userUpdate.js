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

module.exports = userUpdate;