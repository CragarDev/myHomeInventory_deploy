require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { S3 } = require("aws-sdk");

exports.s3Uploadv2 = async (file) => {
  const s3 = new S3();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `inventoryImages/${uuidv4()}_${Date.now()}_${path.basename(file.originalname)}`,
    Body: file.buffer
  };

  return await s3.upload(params).promise();
};

exports.s3Delete = async (file) => {
  const s3 = new S3();

  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.Key

    // the params for deleting a file
    // DELETE /file.Key+?versionId=VersionId HTTP/1.1,
    // Host: Bucket.s3.amazonaws.com,
    // x-amz-mfa: MFA,
    // x-amz-request-payer: RequestPayer,
    // x-amz-bypass-governance-retention: BypassGovernanceRetention,
    // x-amz-expected-bucket-owner: ExpectedBucketOwner,
  };

  return await s3.deleteObject(deleteParams).promise();
};
