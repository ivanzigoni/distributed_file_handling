const fs = require("fs");
const path = require("path");
const {queue} = require("./bull");

function pathConstructor(timestamp) {


    return path.resolve(process.cwd(), "..", "storage", "files", `${timestamp}.csv`);
}

async function saveFile(body) {
    /*
    * b: JSON
    * */

    const timestamp = new Date().toISOString()

    const stream = fs.createWriteStream(pathConstructor(timestamp));

    const fields = Object.keys(body[0]).toString();

    stream.write(`${fields}\n`);

    for (const obj of body) {
        const line = `${obj.name},${obj.email},${obj.gender},${obj.age}`

        stream.write(`${line}\n`);
    }

    stream.close();

    await queue.add("dfl_request", { timestamp })

}

module.exports.saveFile = saveFile;
