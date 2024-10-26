const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

function validation(req, resp, next){
    console.log("funcion middleware");

    

    const token = req.headers.authorization;

    if(!token){
        return resp.status(401).send({
            message: "no tiene autorizacion para acceder"
        })
    }

    jwt.verify(token, SECRET, (error, payload)=>{

        if(error){
            console.log(error)
            return resp.status(401).send({
                message: "no tiene autorizacion para acceder"
            })
        }


        console.log(payload);

        req.user = payload;

        next();


    })

    
}

module.exports = validation;