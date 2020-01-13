const AWS = require("aws-sdk");

// AWS CONFIG

const ID = "AKIAJZ3HAXQOJT6PCFOQ";
const SECRET = "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";
const BUCKET_NAME = "alllor";
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});
const params = {
  Bucket: BUCKET_NAME,
  CreateBucketConfiguration: {
    // Set your region here
    LocationConstraint: "eu-west-1"
  }
};
s3.createBucket(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else console.log("Bucket Created Successfully", data.Location);
});
