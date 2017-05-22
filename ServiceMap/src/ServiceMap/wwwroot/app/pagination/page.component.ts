import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PageService } from './page.service'

@Component({
    selector: 'page-app',
    templateUrl: 'app/pagination/page.component.html',
     styleUrls: ['app/pagination/page.component.css']
})

export class PageComponent implements OnInit {
    // array of all items to be paged
    @Input() totalCount: number;
    @Input() pageSize: number;

    @Output() pageClicked: EventEmitter<number> =
    new EventEmitter<number>();

    // pager object
    pager: any = {};

    constructor(private _pageservice: PageService) { }

    ngOnInit() {
        this.pager = this._pageservice.getPager(this.totalCount, 1, this.pageSize );
    };

    onSetPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pageClicked.emit(page);
        // get pager object from service
        this.pager = this._pageservice.getPager(this.totalCount, page, this.pageSize);
    };
}