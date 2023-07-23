const {Queue} = require("bullmq");


const myQueue = new Queue('dfl_queue', { connection: {
        host: "localhost",
        port: 6379
}});

module.exports.queue = myQueue;
