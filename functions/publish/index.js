const AWS = require('aws-sdk');

const s3 = new AWS.S3();

exports.handler = async event => {
  const payload = JSON.parse(event.body);

  if (payload._type !== 'location') {
    return {
      statusCode: 200,
      body: '[]',
    };
  }

  const latitude = payload.lat;
  const longitude = payload.lon;
  const date = new Date(payload.tst * 1000);

  const yearPart = date.getUTCFullYear();
  const monthPart = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const datePart = date
    .getUTCDate()
    .toString()
    .padStart(2, '0');

  const filename = `${yearPart}-${monthPart}-${datePart}.geojson`;

  const pointFeature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [longitude, latitude],
    },
    properties: {
      date: date.toISOString(),
    },
  };

  let object;

  try {
    object = await s3
      .getObject({ Bucket: process.env.DATA_BUCKET, Key: filename })
      .promise();
  } catch (e) {
    object = null;
  }

  let json;

  if (object) {
    json = JSON.parse(object.Body.toString());

    json.features.push(pointFeature);
  } else {
    json = {
      type: 'FeatureCollection',
      features: [pointFeature],
    };
  }

  await s3
    .putObject({
      Bucket: process.env.DATA_BUCKET,
      Key: filename,
      Body: JSON.stringify(json),
    })
    .promise();

  return {
    statusCode: 200,
    body: '[]',
  };
};
