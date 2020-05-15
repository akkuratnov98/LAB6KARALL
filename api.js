const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require("fs");
const requestHandlers = require(path.resolve(__dirname, 'requestHandlers.js'));

router.get("/start", (req, res)=>{
    const page = fs.readFileSync(path.resolve(__dirname, 'src/input.html'));
    res.write(page);
});

router.post("/upload", (req, res)=>{
    console.log(req.body);
    if (req.body.name.split(' ').length === 2)
        requestHandlers.firstHandler(req.body, res);
    else  requestHandlers.secondHandler(req.body, res);
});


module.exports = router;