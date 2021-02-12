'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { start, init } = require('../lib');

const { describe, it } = exports.lab = Lab.script();

describe('Sever', () => {

    it('starts without error', async () => {

        const server = await start();
        expect(server.info.started).to.not.equal(0);
        expect(server.settings.port).to.equal(3000);
        await server.stop();
    });

    it('inits without error', async () => {

        const server = await init();
        expect(server.info.started).to.equal(0);
        await server.stop();
    });
});
