import { Component, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
type SearchResult = {name: string, cik: string};
type SearchResults = Array<SearchResult>;
type Document = { fullUrl: string, formType: string, fileDate: string };
type DocumentList = { documents: Array<Document>, total: number, page: number };

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    companyName = '';
    searchResult: SearchResult;
    searchResults: SearchResults;
    documentList: DocumentList;

    constructor(private http: HttpClient) {
        this.searchResult = {
            name: '',
            cik: ''
        };
        this.searchResults = [];
        this.documentList = {
            documents: [],
            total: 0,
            page: 0
        };
    }
    tickerSearch(event: any): void {
        if (event.target.value) {
            this.http.get('/api/searchTradeSymbol/' + event.target.value)
                .pipe(map(data => (data as SearchResults)))
                .subscribe(data => this.searchResults = data);
        }
        else {
            this.searchResults = [];
        }
    }

    getDocumentList(searchResult: SearchResult, page: number = 1): void {
        this.searchResult = searchResult;
        this.companyName = searchResult.name;
        this.searchResults = [];
        this.documentList.documents = [];
        this.http.get('/api/getDocuments/' + searchResult.cik + '?page=' + page)
            .pipe(map(data => (data as DocumentList)))
            .subscribe(data => this.documentList = data);
        const el = window.document.getElementsByClassName('documentList')[0];
        if (el) {
            el.scrollTo(0, 0);
        }
    }

    openDocument(document: Document): void {
        window.open(document.fullUrl, '_blank');
    }
    @HostListener('window:mouseup', ['$event'])
    onMouseUp(event: any): void {
        if (findAncestor(event.target, '.searchResultsHolder') === null) {
            this.searchResults = [];
        }
    }
}

function findAncestor(el: any, sel: any): void {
    // tslint:disable-next-line: no-conditional-assignment
    while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el, sel))) { }
    return el;
}
