const jwt = require("jsonwebtoken")
require("dotenv").config();


module.exports.adminMiddleware= async(req,res,next)=>{
    try{
        const token = req.headers.token
        if(!token) res.status(401).json({msg:"not authorized"})
            else{
                const verifyToken =jwt.verify(token,process.env.JWT_SECRET)
                if (!verifyToken){
                  res.status(400).json({msg:"your token is not authorized"})
                }
                else if (!(verifyToken.role==="admin")){
                    
                    
                     res.status(400).json({msg:"your are not a admin "})
                 }
                else{
                    req.adminId=verifyToken.id
                    next()
                }
            }
    }
    catch(error){
        res.status(500).json({msg:"OUP something went wrong", error:error.message})
    }
}
