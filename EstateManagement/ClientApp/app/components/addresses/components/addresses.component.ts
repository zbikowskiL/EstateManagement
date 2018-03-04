import { Component, OnInit, Injectable } from '@angular/core';
import { Address } from '../../../models/address';
import { AddressesService } from '../../addresses/services/addresses.service';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../common/base.component';


@Component({
    templateUrl: './addresses.component.html',
})

export class AddressesComponent extends BaseComponent implements OnInit {
    constructor(
        private addressesService: AddressesService,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private router: Router,
    ) { super(activatedRoute, location) };


    addresses: Array<Address> = new Array<Address>();
    pageTitle: string = "Addresses list";

    ngOnInit(): void {
        this.downloadAddresses();
    }

    downloadAddresses(): void {
        this.addressesService.getAllAddress().subscribe(
            addresses => this.addresses = addresses,
            errorMessage => this.showMassage(true, 'warn', 'Information', false, errorMessage)
        );
    }

    getAddress(id: number): void {
        this.router.navigate(['./addresses/address-details', id]);
    }

    updateAddress(id: number): void {
        this.router.navigate(['./addresses/address-update', id]);
    }

}