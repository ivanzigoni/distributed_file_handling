const { Worker } = require('bullmq');
const {read} = require("./read-from-file");

const myWorker = new Worker('dfl_queue', async (job)=> {
    await read([job.data.timestamp]);

    console.log("done")
}, {
    connection: {
        host: "localhost",
        port: 6379
}});

