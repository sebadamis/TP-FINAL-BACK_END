function isAdmin(req, resp, next){
    
    if(req.user.role !== "admin"){
        return resp.status(403).send({
            message: "Para realizar esta acción deber ser usuario admin"
        })

    }

    next();

}

module.exports = isAdmin;