const { MongoClient } = require('mongodb');

async function main() {

    const dbOptions = {
        url: "mongodb://localhost:27017/",
        db: {
            name: "dlh_app",
            collections: {
                logs: "logs",
                files: "files"
            }
        }
    }

    const client = new MongoClient(dbOptions.url);

    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbOptions.db.name);

    const logsCol = db.collection(dbOptions.db.collections.logs);
    const filesCol = db.collection(dbOptions.db.collections.files);

    return {
        logsCol,
        filesCol,
        client
    }

}

async function saveToMongo(content) {
    /*
    * content
    *
    * { name: string, email: string, gender: string, age: number }[]
    *
    * */


    const { filesCol, client } = await main();

    await filesCol.insertMany(content);

    await client.close();

}


module.exports.saveToMongo = saveToMongo;
