'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('joi');

/* $lab:coverage:off$ */
const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
});
/* $lab:coverage:on$ */

exports.init = async () => {

    await server.initialize();
    return server;
};

server.validator(Joi);
server.route(require('./routes'));

exports.start = async () => {

    // Load the Angular Client
    await server.register(require('@hapi/inert'));
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './client/dist/client/',
                index: 'index.html'
            }
        }
    });
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {

    /* $lab:coverage:off$ */
    console.log(err);
    process.exit(1);
    /* $lab:coverage:on$ */
});
