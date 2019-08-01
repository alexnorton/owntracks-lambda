const AWS = require('aws-sdk');

const s3 = new AWS.S3();

exports.handler = async () => {
  const data = await s3
    .listObjects({ Bucket: process.env.DATA_BUCKET })
    .promise();

  const objects = data.Contents;

  return {
    headers: {
      'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
    },
    body: JSON.stringify(objects.map(({ Key }) => Key.replace('.geojson', ''))),
  };
};
