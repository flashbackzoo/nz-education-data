var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('New Zealand education data. Visit ' + server.info.uri + '/api');
    }
});

server.route({
    method: 'GET',
    path: '/api',
    handler: function (request, reply) {
        reply.file('data.json');
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
