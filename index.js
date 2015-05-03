var Hapi = require('hapi'),
    secrets = require('./secrets');

var server = new Hapi.Server();

server.connection({
    host: secrets.privateAddress,
    port: 3000,
    router: {
        stripTrailingSlash: true
    }
});

server.views({
    engines: {
        jade: require('jade')
    },
    relativeTo: __dirname,
    path: './views'
});

server.register([
    {
        register: require('./routes/public')
    },
    {
        register: require('./routes/home')
    },
    {
        register: require('./routes/examples')
    },
    {
        register: require('./routes/api')
    }
], function (err) {
    if (err) {
        console.log('Failed to load plugin:', err);
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
