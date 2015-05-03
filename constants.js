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

module.exports = constants;