var express = require("express");
var app = express();

// set a custom URL for script src
app.configure('development', function() {
  // live reload script
  app.use(require('../index.js')({
    src: "http://localhost:3000/browser-sync/browser-sync-client.js"
  }));
});


// load static content before routing takes place
app.use(express["static"](__dirname + "/fixtures"));

// load the routes
app.use(app.router);
app.get("/default-test", function(req, res) {
  var html = '<html><head></head><body><p>default test </p></body></html>';
  res.send(html);
});

app.get("/index.html", function(req, res) {
  var html = '<html><head></head><body><p>default test </p></body></html>';
  res.send(html);
});

// start the server
if (!module.parent) {
  var port = settings.webserver.port || 3000;
  app.listen(port);
  console.log("Express app started on port " + port);
}

// run the tests
var request = require('supertest');
var assert = require('assert');


describe('GET /default-test', function(){
  it('respond with inserted script', function(done){
    request(app)
      .get('/default-test')
      .set('Accept', 'text/html')
      .expect(200)
      .end(function(err, res){

        var match = res.text.match(new RegExp("http://localhost:3000/browser-sync/browser-sync-client.js", "g"));
        assert.equal(match.length, 1);
        if (err) return done(err);
        done()
      });
  })
})
