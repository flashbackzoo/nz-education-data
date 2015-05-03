exports.register = function (server, options, next) {
    server.route([
        {
            method: 'GET',
            path: '/public/{path*}',
            handler: {
                directory: {
                    path: 'public',
                    listing: false,
                    index: false
                }
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'public',
    version: '1.0.0'
};
