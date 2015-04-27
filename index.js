var Hapi = require('hapi'),
    fs = require('fs'),
    constants = require('./constants'),
    secrets = require('./secrets');

var server = new Hapi.Server();

server.connection({
    host: secrets.privateAddress,
    port: 3000
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index');
    }
});

server.route({
    method: 'GET',
    path: '/public/{path*}',
    handler: {
        directory: {
            path: 'public',
            listing: false,
            index: false
        }
    }
});

server.route({
    method: 'GET',
    path: '/api',
    handler: function (request, reply) {
        reply.file('data.json').header('Content-Type', 'application/json');
    },
    config: constants.API_ROUTE_CONFIG
});

server.route({
    method: 'GET',
    path: '/api/year/{id}',
    handler: function (request, reply) {
        fs.readFile('./data.json', 'utf8', function (err, data) {
            var response;

            if (err) {
                console.log(err);
                return reply.view('error');
            }

            response = JSON.parse(data)[request.params.id] || {};

            reply(response).header('Content-Type', 'application/json');
        });
    },
    config: constants.API_ROUTE_CONFIG
});

server.views(constants.VIEW_OPTIONS);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
