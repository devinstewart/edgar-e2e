'use strict';

const Wreck = require('@hapi/wreck');
const Joi = require('joi');

module.exports = {
    method: 'GET',
    path: '/api/getDocuments/{cik}',
    options: {
        validate: {
            params: {
                cik: Joi.string().pattern(/^\d{10}$/).required()
            },
            query: {
                page: Joi.number().integer().required()
            }
        }
    },
    async handler(request, h) {

        const startIndex = (request.query.page - 1) * 100;
        const secPayload = {
            ciks: [request.params.cik],
            from: startIndex
        };
        const { payload } = await Wreck.post('https://efts.sec.gov/LATEST/search-index', { payload: secPayload });
        const res = JSON.parse(payload.toString());

        const documents = [];

        for (const hit of res.hits.hits) {

            // Determine the full URL for the document
            // All documents are located at https://www.sec.gov/Archives/edgar/data/...
            // The first path is the cik provided
            // The second path is the adsh (Accession Number) this is in two places in the payload.
            //    The first place is in the _id followed by a ':' then the actual file name
            //    Since the file name is needed for the last part of the path, this one is used.
            //    The adsh contains two "-", that need to be removed as they are not in the path.
            // If the document is an XML, there is an xls file in the _source, otherwise it is null
            //    If it exists this needs to be put in front of the file name to render clean HTML

            const pathParts = hit._id.split(':');
            const adsh = pathParts[0].replace(/-/g, '');
            const xsl = hit._source.xsl;
            let fullUrl;
            if (xsl) {
                fullUrl = `https://www.sec.gov/Archives/edgar/data/${request.params.cik}/${adsh}/${xsl}/${pathParts[1]}`;
            }
            else {
                fullUrl = `https://www.sec.gov/Archives/edgar/data/${request.params.cik}/${adsh}/${pathParts[1]}`;
            }

            documents.push({
                fullUrl,
                formType: hit._source.form,
                fileDate: hit._source.file_date
            });
        }

        const returnResponse = {
            total: res.hits.total.value,
            documents,
            page: request.query.page
        };

        return returnResponse;
    }
};
