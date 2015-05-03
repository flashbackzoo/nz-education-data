var fs = require('fs'),
    constants = require('../constants');

var dataFilePath = __dirname + '/../data.json';

exports.register = function (server, options, next) {
    server.route([
        {
            method: 'GET',
            path: '/api',
            config: constants.API_ROUTE_CONFIG,
            handler: function (request, reply) {
                fs.readFile(dataFilePath, 'utf8', function (err, data) {
                    if (err) {
                        console.log(err);
                        return reply.view('error');
                    }

                    reply(data).header('Content-Type', 'application/json');
                });
            }
        },
        {
            method: 'GET',
            path: '/api/year/{id}',
            config: constants.API_ROUTE_CONFIG,
            handler: function (request, reply) {
                fs.readFile(dataFilePath, 'utf8', function (err, data) {
                    var response;

                    if (err) {
                        console.log(err);
                        return reply.view('error');
                    }

                    response = JSON.parse(data)[request.params.id] || {};

                    reply(response).header('Content-Type', 'application/json');
                });
            }
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'api',
    version: '1.0.0'
};
