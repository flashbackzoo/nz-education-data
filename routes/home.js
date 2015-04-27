exports.register = function (server, options, next) {
    server.route([
        {
            method: 'GET',
            path: '/',
            handler: function (request, reply) {
                reply.view('index');
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'home',
    version: '1.0.0'
};
