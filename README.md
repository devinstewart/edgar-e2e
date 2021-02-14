# edgar-e2e

#### The SEC (Securities and Exchange Commission) collects filings from companies and makes them available to the general public through a service called EDGAR.

#### EDGAR allows any user to look up a company and obtain the filings associated with that company.

#### This program demonstrates how you can use the POST `https://efts.sec.gov/LATEST/search-index` to embed searching EDGAR into your own program

#### Visit: [`https://edgar-e2e.herokuapp.com/`](https://edgar-e2e.herokuapp.com/) for a demo.

## Instalation
- You will need `node` version 12 and `npm` version 6+ to build and run this program. **PLEASE NOTE:** This program only runs on `node` `12.x` at this time.
- Once you have the prerequisites met you can type `npm run build` from the root directory of the repository and all of the needed packages and build scripts will be run.

## Running
- After the program is built, run `npm start` from the root directory of the repository.
- You can then open your browser with the URL `http://localhost:3000` to use the program.

## Architecture
- The architecure of this program consists of two main open source projects:
    - `hapi.js` - A Node.js framework.
    - `Angular` - A TypeScript based SPA frontend framework.
- When `npm run build` is run, the Angular portion of the app is built, this completely resides in the `client` directory.  Once built its compiled files are served by hapi.js.

## APIs
- There are two APIs that make are used in this program:
    - `GET` `/api/searchTradeSymbol/{tradeSymbol}`
        - While EDGAR allows you to search for many things, the scope of this program only searches companies that have trade symbols, like `AAPL` for Apple Inc.
        This API allows you to seach by company name or trade symbols and returns the closest matches to the data as it is entered.
    - `GET` `/api/getDocuments/{cik}?page={pageNumber}`
        - Once a company is chosen, all of the EDGAR documents since 2001 can be retrieved.  Due to the large number of documents, only 100 results are returned at a time.
        The `page` query parameter allows for pagination through the documents.

## Front End
- This is truly a "Single Page App". All Angular code is in one component and one HTML Page.  If you would like to experiment with the Angular portion of the app,
you can launch hapi.js in one terminal, switch to the `/client` directory in another terminal and run `ng serve`.
- You can then launch your browser at `http://localhost:4200`.  There is a proxy configuration that redirects any request starting with `/api` to `localhost:3000`.

## To Do's
- Create mocks for better test covereage.
- Use better pagination than _Prev Page_ and _Next Page_.
- Move to React for lighter front end.
- **You tell me**:  This is permissive open source, so feel free to fork, make contributions, open requests, etc.
