const app = require('./server/bin/bin.express');
const db = require('./server/bin/bin.db');
const routes = require('./server/bin/bin.routes');
const server = require('./server/bin/bin.server');

db();
routes(app);
server(app);