#!/usr/bin/env node
import { Server } from "http";

const app = require('./js/app');
const http = require('http');


const httpPort: number = 8080;
// app.set('port', httpPort);

const httpServer: Server = http.createServer(app);
httpServer.listen(httpPort);

httpServer.on('error', console.log);
httpServer.on('listening', console.log);
