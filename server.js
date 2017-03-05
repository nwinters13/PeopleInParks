var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log("app running at http://localhost:" + port);
});
var bodyParser = require('body-parser');

var mongo = require("mongodb");
var MongoClient = require("mongodb").MongoClient;

var mongoURI = "mongodb://nate:password@ds119250.mlab.com:19250/heroku_5m20cvsr";
var db = mongo(mongoURI);

var addParkEndpoint = '/addPark';
var addFactEndpoint = '/addFact';
var addImageEndpoint = '/addImage';

var parkCollection = 'parks';
var factCollection = 'facts';
var imageCollection = 'images';

var getDailyInfoEndpoint = '/getDailyInfo';

var objectExists;

var HTTP_SUCCESS = 200;


// parse application/json
app.use(bodyParser.json())

app.get("/", function (req, res) {
  res.send("hello there");
})

app.post(addParkEndpoint, function(req, res) {
  ifObjectDoesNotExistThenInsert("name", req.body.name, parkCollection, req, res);
});

app.post(addFactEndpoint, function(req, res) {
  MongoClient.connect(mongoURI, function(err, db) {
    db.collection(parkCollection).find({name:req.body.parkName}).toArray(function (err, r) {
      park = r[0];
      req.body.parkID = r[0]["_id"];
      delete req.body.parkName;
      obj = req.body;
      MongoClient.connect(mongoURI, function(err, db) {
        db.collection(factCollection).insert(obj);
      });
    });
    db.close();
  });
  res.sendStatus(HTTP_SUCCESS);
});

app.post(addImageEndpoint, function(req, res) {
  MongoClient.connect(mongoURI, function(err, db) {
    db.collection(parkCollection).find({name:req.body.parkName}).toArray(function (err, r) {
      park = r[0];
      req.body.parkID = r[0]["_id"];
      delete req.body.parkName;
      obj = req.body;
      MongoClient.connect(mongoURI, function(err, db) {
        db.collection(imageCollection).insert(obj);
      });
    });
    db.close();
  });
  res.sendStatus(HTTP_SUCCESS);
});

function insertObject(req, res, collection) {
  MongoClient.connect(mongoURI, function(err, db) {
    obj = buildDataObject(req);
    db.collection(collection).insert(obj);
    db.close();
  });
}

function buildDataObject(req) {
  obj = req.body;
  return obj;
}

function ifObjectDoesNotExistThenInsert(field, value, collection, req, res) {
  var length = -1;
  MongoClient.connect(mongoURI, function(err, db) {
    var query = {};
    query[field] = value;
    db.collection(collection).find(query).toArray(function (err, r) {
      if (r.length == 0)
        insertObject(req, res, collection);
    });
    db.close();
  });
  res.sendStatus(HTTP_SUCCESS);
}

app.get(getDailyInfoEndpoint, function(req, res) {
  var jsonString = [];
  MongoClient.connect(mongoURI, function(err, db) {
    db.collection(imageCollection).count().then(function(numItems) {
      var now = new Date();
      var start = new Date(now.getFullYear(), 0, 0);
      var diff = now - start;
      var oneDay = 1000 * 60 * 60 * 24;
      var dayOfYear = Math.floor(diff / oneDay);
      count = dayOfYear % numItems;
      MongoClient.connect(mongoURI, function(err, db) {
        db.collection(imageCollection).find({}).skip(count).limit(1).toArray(function (err, r) {
            image = r[0];
            jsonString.push({
              "image": image
            });
            MongoClient.connect(mongoURI, function(err, db) {
              db.collection(parkCollection).find({_id:image["parkID"]}).toArray(function (err, r) {
                park = r[0];
                jsonString.push({
                  "park": park
                });
                MongoClient.connect(mongoURI, function(err, db) {
                  db.collection(factCollection).find({parkID:image["parkID"]}).toArray(function (err, r) {
                    jsonString.push({
                      "facts" : r
                    });
                    res.json(jsonString);
                  });
                });
              });
            });
        });
      });
    });
    db.close();
  });
});
