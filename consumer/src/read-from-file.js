const fs = require("fs");
const path = require("path");
const {promisify} = require("util");
const readFile = promisify(fs.readFile);
const {saveToMongo} = require("./save-to-mongo");

function handleCsv(csvString) {

    const [headerString, ...body] = csvString.split("\n")

    body.pop(); // removes eof blank line

    const header = headerString.split(",");

    return body.map(line => line.split(",").reduce((acc, e, i) => {
        acc[header[i]] = e;
        return acc;
    }, {}))

}

async function read(files) {
    /*
    * files: string[] timestamp
    *
    * */

    const storagePath = path.resolve(process.cwd(), "..", "storage", "files");

    try {

        const res = await Promise.allSettled(
            [...files.map(file => readFile(path.resolve(storagePath, file + ".csv")))]
        )


        await Promise.allSettled(
            res.map(data => saveToMongo(handleCsv(data.value.toString())))
        )


    } catch (err) {

        console.log(err)

        // log?
    }


}

// read(["2023-07-23T19:58:16.708Z", "2023-07-23T19:58:23.668Z"])

module.exports.read = read;
