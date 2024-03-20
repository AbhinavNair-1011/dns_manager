const AWS = require('aws-sdk');

const credentials = new AWS.Credentials({
  accessKeyId:process.env.aws_accessKey ,
  secretAccessKey: process.env.aws_secretKey,
});

AWS.config.update({
  credentials: credentials,
  region: 'ap-south-1' 
});

const route53 = new AWS.Route53();

const createHostedZone = async (domain) => {
  try {
    const params = {
      Name: domain,
      CallerReference: `${Date.now()}` 
    };

    const result = await route53.createHostedZone(params).promise();
  
    const hostedListzoneid = result.HostedZone.Id.split('/').pop();
    return hostedListzoneid;
  } catch (error) {
    console.error('Error creating hosted zone:', error);
  }
};


const createDnsRecord = async (domain, recordType, value, hostedListzoneid) => {
  try {
   
    const params = {
      ChangeBatch: {
        Changes: [
          {
            Action: 'CREATE',
            ResourceRecordSet: {
              Name: domain,
              Type: recordType,
              ResourceRecords: [{ Value: value }],
              TTL: 300
            }
          }
        ]
      },
      HostedZoneId: hostedListzoneid 
    };

    await route53.changeResourceRecordSets(params).promise();
  } catch (error) {
  }
};
const deleteHostedZone = async (hostedZoneId) => {
  try {
    const params = {
      Id: hostedZoneId 
    };
    await route53.deleteHostedZone(params).promise();
    console.log(` deleted successfully.`);
  } catch (error) {
    console.error('Error deleting ', error);
  }
};

const deleteAllResourceRecordSets = async (hostedZoneId) => {
  try {
    const params = {
      HostedZoneId: hostedZoneId 
    };

    const data = await route53.listResourceRecordSets(params).promise();
    const recordSets = data.ResourceRecordSets;

    for (const recordSet of recordSets) {
      if (recordSet.Type !=='NS' && recordSet.Type !=="SOA") {
        const deleteParams ={
          ChangeBatch: {
            Changes: [
              {
                Action: 'DELETE',
                ResourceRecordSet: recordSet
              }
            ]
          },
          HostedZoneId: hostedZoneId
        };

      await route53.changeResourceRecordSets(deleteParams).promise();
    }
  }
    console.log(' deleted successfully');
  } catch (error) {
    console.error('Error deleting ', error);
  }
};




module.exports={route53,createHostedZone,createDnsRecord,deleteHostedZone,deleteAllResourceRecordSets};

