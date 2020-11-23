import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';
import {EcommerceProductsService} from "./products.service";
import {Product} from "../e-commerce/product/product.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {PaypalModalComponent} from "./paypal-modal/paypal-modal/paypal-modal.component";
import {FuseSplashScreenService} from "../../../@fuse/services/splash-screen.service";
// @ts-ignore
import {CookieService} from "ngx-cookie-service";

@Component({
    selector     : 'e-commerce-products',
    templateUrl  : './products.component.html',
    styleUrls    : ['./products.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class EcommerceProductsComponent implements OnInit
{
    dataSource = new MatTableDataSource<any>();
    displayedColumns = [ 'name', 'price', 'active', 'order'];
    displayedColumnsOrders = [ 'name', 'client','clientEmail', 'price'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild('filter', {static: true})
    filter: ElementRef;

    order;

    orders;

    priv;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _ecommerceProductsService: EcommerceProductsService,
        private _matDialog: MatDialog,
        private _fuseSplashScreen: FuseSplashScreenService,
        private _cookieService: CookieService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {


        this.priv = this._cookieService.get('user');

        if (this.priv == 'u') {
            this.orders = JSON.parse(localStorage.getItem('orders'));
            this.dataSource.data = this.orders
        } else {
            const prods = [];
            for(let i = 0; i < 4; i++) {
                const prod = new Product();
                prod.active = true;
                switch(i){
                    case 0:
                        prod.name = 'Pre-Wedding'
                        prod.priceTaxExcl = 1000.00
                        prod.priceTaxIncl = 1000.00
                        prod.description = 'Producto 1'
                        break;
                    case 1:
                        prod.name = 'Wedding'
                        prod.priceTaxExcl = 5000.00
                        prod.priceTaxIncl = 5000.00
                        prod.description = 'Producto 2'
                        break;
                    case 2:
                        prod.name = 'Birthday'
                        prod.priceTaxExcl = 3000.00
                        prod.priceTaxIncl = 3000.00
                        prod.description = 'Producto 3'
                        break;
                    case 3:
                        prod.name = 'Event Video'
                        prod.priceTaxExcl = 4000.00
                        prod.priceTaxIncl = 4000.00
                        prod.description = 'Producto 4'
                        break;
                }
                prods.push(prod)
                console.log('in get prod', prod, prods);

            }

            this.dataSource.data = prods
        }

        console.log('in products',this.dataSource, this.priv, this.orders);

        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if ( !this.dataSource )
                {
                    return;
                }

                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }

    openPaypalModal(row) {

        const ref = this._matDialog.open(PaypalModalComponent,{
            data: row,
            width: 'fit-content'
        }).afterClosed().subscribe(value => {

            this._fuseSplashScreen.hide();

            if(value) {

                console.log('recieved order', value);
                this.order = value;

            }



        });

    }
}

