const bcrypt= require("bcrypt");

const encryptPassword=(req,res,next)=>{

    const userDetails=req.body;
    
    bcrypt.hash(userDetails.password,2,(err,hashedPassword)=>{
        if(err){
            console.log(err)
            return 
        }

        userDetails.password=hashedPassword;
        next();
        

    })
}

module.exports=encryptPassword;