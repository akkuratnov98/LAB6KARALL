const fs = require("fs");
const { Image } = require('image-js');
const path = require('path');

async function firstHandler(body, res) {
    let name = body.name.split(' ');
    let img = await Image.load(path.resolve(__dirname, `images/${name[0]}s/${name[1]}.jpg`));
    changeSize(img, body.weight, body.height);
    await img.save('toSend.jpg');
    res.sendfile('toSend.jpg');
}

async function secondHandler(body, res) {
    let name = body.name;
    let find = false;
    let i = 0;
    let img;
    while (find === false && i<9){
        img = await Image.load(path.resolve(__dirname, `images/${name}s/${i}.jpg`));
        if (findColor(img) === body.colour) find = true;
        i++;
    }
    if (find === false) {
        res.sendStatus(404);
        return null;
    }
    changeSize(img, body.weight, body.height);
    await img.save('toSend.png');
    res.sendfile('toSend.png');
}

function findColor(img){
    let pixelCount = 0, redPixel = 0, greenPixel = 0, bluePixel = 0;
    for (let i = 0; i<img.size; i=i+4){
        pixelCount++;
        let pixel = img.getPixel(i);
        redPixel += pixel[0];
        greenPixel += pixel[1];
        bluePixel += pixel[2];
    }
    if (redPixel > greenPixel && redPixel > bluePixel) return 'red';
    if (greenPixel > redPixel && greenPixel > bluePixel) return 'green';
    if (bluePixel > greenPixel && bluePixel > redPixel) return 'blue';
}

function changeSize(img, width, height){
    if (!(width === "") && !(height === "")){
        img = img.resize(
            {width: width,
                height : height}
        );
    }
    if (!(width === "") && (height === "")){
        img = img.resize({width: width});
    }
    if ((width === "") && !(height === "")){
        img = img.resize({height : height});
    }
}
exports.firstHandler = firstHandler;
exports.secondHandler = secondHandler;