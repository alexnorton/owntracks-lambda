const AWS = require('aws-sdk');

const s3 = new AWS.S3();

exports.handler = async event => {
  const key = `${event.pathParameters.date}.geojson`;

  let object;

  try {
    object = await s3
      .getObject({ Bucket: process.env.DATA_BUCKET, Key: key })
      .promise();
  } catch (e) {
    return {
      statusCode: 404,
    };
  }

  return {
    headers: {
      'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
    },
    body: object.Body.toString(),
  };
};
