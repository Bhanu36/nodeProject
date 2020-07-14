const redis = require("redis");
const port = process.env.HOST || 6379;
const client = redis.createClient({ host: "localhost", port: port });

client.on("connect", function () {
  console.log(`connected with redis server PORT ${port}`);
});

module.exports = client;
