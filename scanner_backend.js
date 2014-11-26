// "use strict"

var express = require("express");
var app = express();
var morgan = require("morgan");
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

// define hardcoded data
var barcodeId = "1";
var serialNumber = "9";
var myPass = {
    voided: false,
    id: "myPass",
    balance: 0
};

// configure the app
app.use(morgan('combined'));
app.use(bodyParser.json());

// define routes
app.get('/', function(req,res){
   res.send("testing / route OK")
});

app.post("/testing/barcode/:barcodeId", function(req,res){

   if  (req.params.barcodeId === barcodeId) {
       res.json({"serialNumber": serialNumber}).end();
   } else {
       res.json({"serialNumber": "no data"}).end();
   }

});

app.post("/testing/serial/:serialNumber", function(req,res){

    if (req.params.serialNumber === serialNumber) {
        res.json({"pass": myPass}).end();
    } else {
        res.json({"pass": "no data"}).end();
    }
});

app.post("/testing/serial/:serialNumber/update", function(req,res){

    if (!req.body) {
        return res.sendStatus(400);
    }

    if (req.params.serialNumber === serialNumber) {
        if (req.body.voided === "true" && myPass.voided === false) {
            myPass.voided = true;
            res.json({"pass": myPass}).end();
        } else if ((req.body.voided === "true" && myPass.voided === true)) {
            res.send("already voided").end()
        } else {
            res.send("no change").end()
        }
        res.json({"pass": myPass}).end();

    } else {
        res.json({"pass": "no data"}).end();
    }
});

// server launch
app.listen(port);
console.log("server started on port %s", port);