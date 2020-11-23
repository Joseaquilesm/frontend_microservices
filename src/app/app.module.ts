import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {Login2Component} from "./main/login-2/login-2.component";
import {HomeComponent} from "./main/home/home.component";
import {Register2Component} from "./main/register-2/register-2.component";
import {EcommerceProductsComponent} from "./main/products/products.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {EcommerceProductsService} from "./main/products/products.service";
import {MatSortModule} from "@angular/material/sort";
import { PaypalModalComponent } from './main/products/paypal-modal/paypal-modal/paypal-modal.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {AuthGuard} from "./guards/auth.guard";

const appRoutes: Routes = [

    {
        path     : 'login',
        component: Login2Component
    },
    {
        path        : 'home',
        component: EcommerceProductsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: Register2Component
    }
];

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        Login2Component,
        Register2Component,
        EcommerceProductsComponent,
        PaypalModalComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatDialogModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        MatCheckboxModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    bootstrap   : [
        AppComponent
    ], providers :[
        EcommerceProductsService
    ], entryComponents: [
        PaypalModalComponent
    ]
})
export class AppModule
{
}
