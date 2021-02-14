'use strict';

const Fs = require('fs');

let routes = [];

Fs.readdirSync(__dirname)
    .filter((file) => file !== 'index.js')
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => {

        routes = routes.concat(require(`./${file}`));
    });

module.exports = routes;
