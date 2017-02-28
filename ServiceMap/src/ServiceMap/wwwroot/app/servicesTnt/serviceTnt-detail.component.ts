import { Component, OnInit } from '@angular/core';
import { IServiceTnt } from './serviceTnt';

@Component({
    selector: 'service-detail',
    templateUrl: 'app/servicesTnt/serviceTnt-detail.component.html'
})

export class ServiceTntDetailComponent implements OnInit {
    pageTitle: string = 'Dane Oddziału';
    product: IServiceTnt;

  
    ngOnInit(): void
    {
        //let id = +this._route.snapshot.params['id'];
        //this.pageTitle += `:${id}`;
    }
}