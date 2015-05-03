var Lab = require('lab'),
    Code = require('code'),
    Hapi = require('hapi'),
    fs = require('fs');

var lab = exports.lab = Lab.script(),
    describe = lab.describe,
    beforeEach = lab.beforeEach,
    it = lab.it,
    expect = Code.expect;

describe('API', function () {
    var server;

    beforeEach(function (done) {
        server = new Hapi.Server();
        server.connection();
        server.register([{ register: require('../routes/api') }], function (err) {
            if (err) {
                console.log('Failed to load plugin:', err);
            }
        });

        done();
    });

    it('should return 404 when no ID is present', function (done) {
        server.inject({ url: '/api/year' }, function (res) {
            expect(res.statusCode).to.equal(404);
            done();
        });
    });

    it('should return data for 1999', function (done) {
        server.inject({ url: '/api/year/1999' }, function (res) {
            expect(res.statusCode).to.equal(200);

            fs.readFile(__dirname + '/1999.json', 'utf8', function (err, data) {
                expect(res.payload).to.equal(data);
                done();
            });
        });
    });
});
