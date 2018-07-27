var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
const Graph = require('node-dijkstra');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

console.log('Starting Beta Quest GPS...');

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

app.listen(5000);