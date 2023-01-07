const getRoleMiddleWare = async (req, res, next) =>
{

    console.log("middleware getRoleMiddleWare ... ")

    if ( !req.body?.token)
    {
        req.role = "unAuthenticated";
        return next();
    }
    const User = req.app.get("models").User;
    next();

    const checkUser = await User.findOne({token: req.body.token});

    if ( !checkUser)
    {
        req.role = "unAuthenticated";
        return next();
    }

    console.log("getRoleMiddleWare checked user role "+checkUser['role']);

    req.role == checkUser['role'];
};

module.exports = getRoleMiddleWare;