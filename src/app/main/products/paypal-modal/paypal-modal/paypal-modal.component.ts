import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {log} from "util";
import {FuseSplashScreenService} from "../../../../../@fuse/services/splash-screen.service";

declare var paypal;

@Component({
  selector: 'app-paypal-modal',
  template: `
      <div style="width: 100%" fxLayout="column" fxLayoutAlign="space-around center">
          
          <div>
              <h1>Buying {{product.name}}</h1>
              <h3>$ {{product.priceTaxExcl}}</h3>
          </div>
          
          <div #paypal></div>
          
          <button mat-button [mat-dialog-close]="false" color="warn">Cancel</button>
          
      </div>
  `,
  styles: []
})
export class PaypalModalComponent implements OnInit {

    @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

    orders;
    product;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<PaypalModalComponent>,
              private _fuseSplashScreen: FuseSplashScreenService) { }

    ngOnInit(): void {



      if (localStorage.getItem('orders') !== null) {
          this.orders = JSON.parse(localStorage.getItem('orders'))
      } else {
          this.orders = [];
      }

      this.product = this.data;

        paypal
            .Buttons({
                createOrder: (data, actions) => {
                    this._fuseSplashScreen.show();
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: this.product.name,
                                amount: {
                                    currency_code: 'USD',
                                    value: this.product.priceTaxIncl
                                }
                            }
                        ]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    //this.paidFor = true;
                    this.orders.push(order);
                    localStorage.setItem('orders',JSON.stringify(this.orders));
                    this.dialogRef.close(order);
                    console.log('order', order);
                },
                onError: err => {
                    console.log(err);
                }
            })
            .render(this.paypalElement.nativeElement);

        console.log(this.data);
    }


}
