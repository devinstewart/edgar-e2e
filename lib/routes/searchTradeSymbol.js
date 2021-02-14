'use strict';

const Wreck = require('@hapi/wreck');
const Joi = require('joi');

module.exports = {
    method: 'GET',
    path: '/api/searchTradeSymbol/{tradeSymbol}',
    options: {
        validate: {
            params: {
                tradeSymbol: Joi.string()
            }
        }
    },
    async handler(request, h) {

        const results = [];
        const { payload } = await Wreck.post('https://efts.sec.gov/LATEST/search-index', { payload: { keysTyped: request.params.tradeSymbol } });
        const res = JSON.parse(payload.toString());
        for (const hit of res.hits.hits) {
            /* $lab:coverage:off$ */
            if (hit._source.tickers) {
                /* $lab:coverage:on$ */
                results.push({ name: hit._source.entity, cik: hit._id.padStart(10, '0') });
            }
        }

        return results;
    }
};
