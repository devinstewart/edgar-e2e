'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../../lib');

describe('GET /api/getDocuments/{cik} ', () => {

    let server;

    beforeEach(async () => {

        server = await init();
    });

    afterEach(async () => {

        await server.stop();
    });

    it('calls cik 0000320193, page 2 and returns results ', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/api/getDocuments/0000320193?page=1'
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result.total).to.be.greaterThan(0);
    });
});
