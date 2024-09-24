const http = require('http');

const server = http.createServer(function(req, res) {
  if (req.url === '/') {
    res.end('server!');
  }
})

server.listen(3000);