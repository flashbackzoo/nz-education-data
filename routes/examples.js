exports.register = function (server, options, next) {
    server.route([
        {
            method: 'GET',
            path: '/examples',
            handler: function (request, reply) {
                reply.view('examples');
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'examples',
    version: '1.0.0'
};
