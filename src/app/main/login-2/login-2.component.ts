import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import {takeUntil} from "rxjs/operators";
import {confirmPasswordValidator} from "../register-2/register-2.component";
import {Subject} from "rxjs";
import {Route, Router} from "@angular/router";
// @ts-ignore
import {CookieService} from "ngx-cookie-service";

@Component({
    selector     : 'login-2',
    templateUrl  : './login-2.component.html',
    styleUrls    : ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Login2Component implements OnInit,OnDestroy
{
    loginForm: FormGroup;
    registerForm: FormGroup;

    switchForm = false;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     * @param _router
     * @param _cookieService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _cookieService: CookieService
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

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
        this.loginForm = this._formBuilder.group({
            email   : ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.registerForm = this._formBuilder.group({
            name           : ['', Validators.required],
            username       : ['', Validators.required],
            email          : ['', [Validators.required, Validators.email]],
            password       : ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    login() {
        console.log('login in', this.loginForm);

        const values = this.loginForm.value;

        console.log(values);

        //user@kompany.com to view orders

        //client@kompany.com to view products

        if(values.email === 'user@kompany.com') {

            values.id = 'u';
            localStorage.setItem('email', values.email);
            this._cookieService.set('user', 'u');
            this._router.navigate(['/home']);

        } else if (values.email === 'client@kompany.com') {

            values.id = 'c';
            localStorage.setItem('email', values.email);
            this._cookieService.set('user', 'c');
            this._router.navigate(['/home']);

        } else {
            alert('User not found');
        }

    }
}


