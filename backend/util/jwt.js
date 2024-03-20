const jwt=require("jsonwebtoken");

const authenticateUser= (req,res,next)=>{

const token=req.headers.authorization;
const userData=jwt.verify(token,"testingtesting");

 req.userData=userData;

        next()
}

module.exports=authenticateUser