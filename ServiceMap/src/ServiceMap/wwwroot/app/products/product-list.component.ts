import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: 'app/products/product-list.component.html',
    styleUrls: ['app/products/product-list.component.css']
})

export class ProductListComponent implements OnInit {

    pageTitle: string = "Product List !";
    imageWidth: number = 50;
    imageMargin: number = 2;
    listFilter: string;
    products: IProduct[];
    errorMessage: string;

    constructor(private _productService: ProductService) {

    }

    searchProducts(): void {
       
    }

    ngOnInit(): void {
        console.log('testowanie init');
        this._productService.getProducts()
            .subscribe(product => this.products = product,
            error => this.errorMessage = <any>error);
    }

    //onRatingClicked(message: string): void {
    //    this.pageTitle = 'Product List: ' + message;
    //}

}