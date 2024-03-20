const User = require('../models/user');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")


const addUser=(req,res,next)=>{
    
const userDetails=req.body;
const newUser = new User({
  name: userDetails.name,
  email: userDetails.email,
  dob: userDetails.dob,
  password: userDetails.password
});

newUser.save()
  .then(savedUser => {
    res.status(200).json({status:"successfull"})
    
  })
  .catch(error => {
    res.status(409).json({status:"User Email Already Exists",message:error.keyValue})
  });

}


const validateUser= async (req,res,next)=>{
  
const {email,password}=req.body;

try{
  

const user= await User.findOne({email});

if(!user){
 return  res.status(404).json({status:"failed-user",message:"user not found"})
  
}
const check = await bcrypt.compare(password,user.password);
if(!check){
  return res.status(401).json({status:"failed-password",message:"incorrect password"})
}else if(check){

  const jwtUserDetail={
    name:user.name,
    email:user.email,
    id:user._id.toString()
  }
  const token =jwt.sign(jwtUserDetail,"testingtesting")
  return res.status(200).json({status:"successfull",token:token})
  
}

}catch(err){
  console.log(err)
}


}

module.exports={addUser,validateUser}