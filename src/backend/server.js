#!/usr/bin/env node

const app = require('./js/app');
const http = require('http');


const httpPort = 8080;
// app.set('port', httpPort);

const httpServer = http.createServer(app);
httpServer.listen(httpPort);

httpServer.on('error', console.log);
httpServer.on('listening', console.log);
