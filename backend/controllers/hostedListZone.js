const AWS = require('aws-sdk');
const User = require('../models/user');

const HostedListZoneId = require('../models/hostedListZone'); 

const {route53,createHostedZone,createDnsRecord,deleteHostedZone,deleteAllResourceRecordSets} = require("../aws/route53")






const addDnsRecord = async (req, res) => {
    const { domain, recordType, value } = req.body;
    const userData=req.userData;
    
    
    try {
      const hostedListzoneid = await createHostedZone(domain);
      
      const hostedListZoneIdEntry = new HostedListZoneId({
        hostedListzoneid,
        userId:userData.id
      });
      await hostedListZoneIdEntry.save();
      await createDnsRecord(domain, recordType, value, hostedListzoneid);
      
      res.status(201).json({ message: 'DNS record added successfully' });
    } catch (error) {
    console.log(error)
    }
  };
  
  




const getDns = async (req,res,next) => {

const userData=req.userData;

const user= await HostedListZoneId.find({userId:userData.id});

if (!user){

}else{


const array = [];
for (const userObj of user) {
    const list = await a(userObj.hostedListzoneid);
    array.push(list);

}
return res.status(200).json({status:"successfull",dnsRecords:array})
}

}


const a= async(hostedZoneId)=>{
  try {
    const params = {
      HostedZoneId: hostedZoneId     }

    const data = await route53.listResourceRecordSets(params).promise();

    return {data:data.ResourceRecordSets,hostedZoneId};
  } catch (error) {
  }

}


const deleteDns=async (req,res,next)=>{

  const hostedZoneId=req.params.id

  try{

    await HostedListZoneId.findOneAndDelete({hostedListzoneid:hostedZoneId})
  await deleteAllResourceRecordSets(hostedZoneId)
  await deleteHostedZone(hostedZoneId)
  

  return res.status(200).json({status:"successfull"})
  }catch(err){
    console.log(err)

  }
  

}

  
  module.exports={addDnsRecord,getDns,deleteDns}