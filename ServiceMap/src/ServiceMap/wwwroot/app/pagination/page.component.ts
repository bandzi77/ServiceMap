import { Component, Input, OnInit } from '@angular/core';
import { PageService } from './page.service'

@Component({
    selector: 'page-app',
    templateUrl: 'app/pagination/page.component.html'
})

export class PageComponent implements OnInit {
    // array of all items to be paged
    @Input() allItems: any[];
    // pager object
    pager: any = {};
    // paged items
    pagedItems: any[];

    constructor(private _pageservice: PageService) { }

    ngOnInit() {
                // initialize to page 1
                this.setPage(1);
            };
    

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        // get pager object from service
        this.pager = this._pageservice.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}