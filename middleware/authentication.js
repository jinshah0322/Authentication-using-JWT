const jwt = require("jsonwebtoken")
const customAPIError = require("../errors/custom-error")

const authMiddleware = async (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new customAPIError("No token porvided",400)
    }

    const token = authHeader.split(' ')[1]
    console.log(token);

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const {id,username} = decoded
        req.user = {id,username}
        next()
    } catch(error){
        throw new customAPIError("Your are not authorized to access this route.",401)
    }  
}

module.exports = authMiddleware