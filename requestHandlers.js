var querystring = require("querystring");
var compressor = require("./Compressor");
function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<input type="submit" value="Show XML" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/html"});

    var recivedtxt = compressor.compress()+'';

  response.write(recivedtxt);
  console.log(compressor.compress);
  response.end();
}

exports.start = start;
exports.upload = upload;
