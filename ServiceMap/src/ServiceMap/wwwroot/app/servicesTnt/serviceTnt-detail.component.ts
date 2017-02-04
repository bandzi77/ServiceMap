import { Component, OnInit } from '@angular/core';
import { IServiceTnt } from './serviceTnt';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: 'app/servicesTnt/serviceTnt-detail.component.html'
})

export class ServiceTntDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    product: IServiceTnt;

    constructor(private _route: ActivatedRoute,
    private _router: Router){ 
    }

    ngOnInit(): void
    {
        let id = +this._route.snapshot.params['id'];
        this.pageTitle += `:${id}`;
    }

    onBack(): void {
        this._router.navigate(['/serviceTnt']);
    }
}