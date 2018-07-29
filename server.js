var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
const Graph = require('node-dijkstra');

var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

console.log(`Starting Beta Quest GPS on port ${port}...`);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/path-finder', function(req, res) {
console.log('Path finder requested');
var mapState = req.body.mapState;
var graph = new Graph(mapState);
var start = req.body.source;
var end = req.body.destination;
console.log(`Computing ${start} to ${end}`);
var computedPath = graph.path(start, end);
console.log(computedPath);
res.json(computedPath);
});

app.listen(port);