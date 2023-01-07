async function usersGet(req,res){

    try{
        const userRole = req['role'] ;
        if ( !userRole || userRole !== "admin")
        {
            return res.json("u dont have authorization to perform this operation. Aborted...");
        }
        const User = req.app.get("models").User;
    
        const myUser = await User.find();
        res.json(myUser);
        } 
        catch (error) {
            res.json(error.message);
        }
    
}
    

    module.exports = usersGet;