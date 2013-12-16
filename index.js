var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

/*define targets to the receiving requests on the server*/ 
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle); //start listning to the port
