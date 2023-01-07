async function userDelete(req,res){

    try
    {
        if ( !req.body._id){
            return res.json("id not found. Aborted");
        }

        const userRole = req['role'] ;
        if ( !userRole || userRole !== "admin")
        {
            return res.json("u dont have authorization to perform this operation. Aborted...");
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

    module.exports = userDelete;
