const express = require("express");
const {saveFile} = require("./save-file");
const bodyParser = require("body-parser");



const app = express();

app.use(bodyParser());

app.post("/", async (req, res) => {
    /*
    * payload
    *
    * { name: string, email: string, gender: string, age: number }[]
    *
    * */

    saveFile(req.body);

    res.status(200).end();
})

app.listen(3000);
