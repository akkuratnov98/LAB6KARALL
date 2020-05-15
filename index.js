const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:true}));

app.use("/", require("./api"));
0

app.listen(8888, ()=>{
    console.log("Server listening 8888 port");
});