const mysql = require('mysql');

exports.handler = (event, context, callback) => {
  console.log(event);

  const payload = JSON.parse(event.body);

  if (payload._type !== 'location') {
    return callback(null, {
      statusCode: 200,
      body: '[]',
    });
  }

  var connection = mysql.createConnection({
    host:
      'owntracks-lambda-databasecluster-bj3ucob2wp42.cluster-cfkjczrkbjmo.eu-west-1.rds.amazonaws.com',
    user: 'user',
    password: 'password',
    database: 'owntrackslambda',
  });

  connection.connect();

  const update = {
    tracker_id: payload.tid,
    latitude: payload.lat,
    longitude: payload.lon,
    date: new Date(payload.tst * 1000),
  };

  console.log(update);

  connection.query(
    'INSERT INTO locations SET ?',
    update,
    (error, results, fields) => {
      if (error) {
        console.error(error);
        throw error;
      }

      console.log(results);

      callback(null, {
        statusCode: 200,
        body: '[]',
      });
    }
  );

  connection.end();
};
