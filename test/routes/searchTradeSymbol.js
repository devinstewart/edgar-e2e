'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../../lib');

describe('GET /api/searchTradeSymbol/{tradeSymbol} ', () => {

    let server;

    beforeEach(async () => {

        server = await init();
    });

    afterEach(async () => {

        await server.stop();
    });

    it('calls APPL and returns results ', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/api/searchTradeSymbol/AAPL'
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result.length).to.be.greaterThan(0);
    });

    it('calls APPLD and returns empty Array ', async () => {

        const res = await server.inject({
            method: 'get',
            url: '/api/searchTradeSymbol/AAPLD'
        });
        expect(res.statusCode).to.equal(200);
        expect(res.result.length).to.equal(0);
    });

});
