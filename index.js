var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('index');
    }
});

server.route({
    method: 'GET',
    path: '/api',
    handler: function (request, reply) {
        reply.file('data.json');
    }
});

server.views({
    engines: {
        jade: require('jade')
    },
    relativeTo: __dirname,
    path: './views'
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
