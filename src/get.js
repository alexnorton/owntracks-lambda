const AWS = require('aws-sdk');

const s3 = new AWS.S3();

exports.handler = async event => {
  const key = `${event.pathParameters.date}.geojson`;

  const object = await s3
    .getObject({ Bucket: process.env.DATA_BUCKET, Key: key })
    .promise();

  return {
    body: object.Body.toString(),
  };
};
