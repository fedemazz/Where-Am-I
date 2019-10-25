var express = require('express');
var app = express();
var path = require('path');
var http = require('http');



app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/browser', function (req, res) {
	res.sendFile(path.join(__dirname + '/browser.html'));
});

app.get('/editor', function (req, res) {
	res.sendFile(path.join(__dirname + '/editor.html'));
});

app.get('/browser.js', function(req, res){
	res.sendFile(path.join(__dirname + '/browser.js'));
});

app.get('/stile.css', function(req, res){
	res.sendFile(path.join(__dirname + '/stile.css'));
});

app.get('/maps.js', function(req, res){
	res.sendFile(path.join(__dirname + '/maps.js'));
});

app.get('/editor.css', function(req, res){
	res.sendFile(path.join(__dirname + '/editor.css'));
});

app.get('/video.css', function(req, res){
	res.sendFile(path.join(__dirname + '/video.css'));
});

app.get('/bootstrap/full-width-pics.css', function(req, res){
	res.sendFile(path.join(__dirname + '/bootstrap/full-width-pics.css'));
});

app.get('/bootstrap/bootstrap.min.css', function(req, res){
	res.sendFile(path.join(__dirname + '/bootstrap/bootstrap.min.css'));
});

app.get('/bootstrap/bootstrap-grid.min.css.map', function(req, res){
	res.sendFile(path.join(__dirname + '/bootstrap/bootstrap-grid.min.css.map'));
});

app.get('/bootstrap/jquery.min.js', function(req, res){
	res.sendFile(path.join(__dirname + '/bootstrap/jquery.min.js'));
});

app.get('/bootstrap/bootstrap.bundle.min.js', function(req, res){
	res.sendFile(path.join(__dirname + '/bootstrap/bootstrap.bundle.min.js'));
});


app.get('/sfondo.jpg', function(req, res){
	res.sendFile(path.join(__dirname + '/sfondo.jpg'));
});

app.get('/dev.jpg', function(req, res){
	res.sendFile(path.join(__dirname + '/dev.jpg'));
});

app.get('/favicon.ico', function(req, res){
	res.sendFile(path.join(__dirname + '/favicon.ico'));
});


app.listen(8000, function(){
	console.log('Server Started on port 8000...');
});


