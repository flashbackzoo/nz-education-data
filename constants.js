var constants = {};

constants.API_ROUTE_CONFIG = {
    cors: {
        methods: ['GET']
    },
    cache: {
        expiresIn: 60 * 60 * 24 * 7, // 1 week
        privacy: 'private'
    }
};

constants.VIEW_OPTIONS = {
    engines: {
        jade: require('jade')
    },
    relativeTo: __dirname,
    path: './views'
};

module.exports = constants;