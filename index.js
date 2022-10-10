const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET
});

const s3 = new AWS.S3();
const filePath = "./data/feature-logo.png";

//configuring parameters
var params = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Body : fs.createReadStream(filePath),
  Key : "folder/"+Date.now()+"_"+path.basename(filePath)
};

s3.upload(params, (err, data) => {
  //handle error
  if (err) {
    console.log("Error", err);
  }

  //success
  if (data) {
    console.log("Uploaded in:", data.Location);
  }
});