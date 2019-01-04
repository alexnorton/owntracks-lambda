const fs = require('fs');

const { handler } = require('./app');

async function main() {
  const file = fs.readFileSync('locations.csv').toString();

  const lines = file.split('\n');

  for (const line of lines.slice(1, lines.length - 1)) {
    const fields = line.split(',');

    await handler({
      body: JSON.stringify({
        _type: 'location',
        lat: parseFloat(fields[2]),
        lon: parseFloat(fields[3]),
        tst: Math.floor(
          new Date(fields[4].match('"(.+)"')[1]).getTime() / 1000
        ),
      }),
    });
  }
}

main();

// console.log(updates);
