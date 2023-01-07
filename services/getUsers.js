async function usersGet(req,res){

    try{
        const User = req.app.get("models").User;
    
        const myUser = await User.find();
        res.json(myUser);
        } catch (error) {
            res.json(error.message);
        }
    
    }

    module.exports = usersGet;