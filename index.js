const server = require('./server');

// listen
server.listen(process.env.PORT || 4500, () => {
  console.log('listening on the server ' + (process.env.PORT || 4500 ));
})

