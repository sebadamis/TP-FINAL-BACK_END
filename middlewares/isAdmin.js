function isAdmin(req, resp, next){
    
    if(req.user.role !== "admin"){
        return resp.status(403).send({
            message: "no tienes permiso para acceder a este recurso"
        })

    }

    next();

}

module.exports = isAdmin;