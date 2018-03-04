import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Address } from '../../../models/address';
import { AddressesService } from '../../addresses/services/addresses.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/components/common/api';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { BaseComponent } from '../../../common/base.component';

@Component({
    templateUrl: './new-address.component.html',
    selector: 'new-address',
})

export class NewAddressComponent extends BaseComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private addressesService: AddressesService,
        private location: Location
    ) { super(activatedRoute, location) };


    ngOnInit(): void {
        this.detectUrlParam();
        this.wathPathUrl();
        this.address = new Address();
        this.messages = new Array<Message>();
    }

    address: Address;
    urlParam: number;
    pageTitle: string = "Localization";
    isInAddressDetailsMode: boolean = false;

    @Input() receivedId: number;
    @Output() addressAddedEvent: EventEmitter<number> = new EventEmitter<number>();

    wathPathUrl(): void {
        if (this.location.isCurrentPathEqualTo("/properties/property-update/" + this.urlParam)) {
            this.downloadAddress(this.receivedId);
            this.isInEditMode = true;
        }
        else if (this.location.isCurrentPathEqualTo("/properties/property-details/" + this.urlParam)) {
            this.downloadAddress(this.receivedId),
                this.isInEditMode = false;
        }
        else if (this.location.isCurrentPathEqualTo("/addresses/address-details/" + this.urlParam)) {
            this.downloadAddress(this.urlParam);
            this.isInAddressDetailsMode = true;
            this.isInEditMode = false;
        }
        else if (this.location.isCurrentPathEqualTo("/addresses/address-update/" + this.urlParam)) {
            this.downloadAddress(this.urlParam);
            this.isInAddressDetailsMode = true;
            this.isInEditMode = true;
        }

    }

    onSubmit(newAddress: Address): void {
        if ((this.location.isCurrentPathEqualTo("/properties/property-update/" + this.urlParam)) ||
            (this.location.isCurrentPathEqualTo("/addresses/address-update/" + this.urlParam))) {
            this.addressesService.updateAddress(newAddress).subscribe(
                id => {
                    this.showMassage(false, 'success', 'Confirmation', true, 'Address has been update successfully!');
                    this.addressAddedEvent.emit(id);
                },
                errorMessage => this.showMassage(true, 'warn', 'Information', false, errorMessage)
            )
        }
        else {
            this.addressesService.addAddress(newAddress).subscribe(
                id => {
                    this.showMassage(false, 'success', 'Confirmation', false, 'Address has been creatded successfully!');
                    this.addressAddedEvent.emit(id);
                },
                errorMessage => this.showMassage(true, 'warn', 'Information', false, errorMessage)
            )
        }
    }

    detectUrlParam(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.urlParam = params['id'];
        })
    }

    downloadAddress(id: number): void {
        this.addressesService.getAddress(id).subscribe(
            address => this.address = address,
            errorMessage => this.showMassage(true, 'warn', 'Information', false, errorMessage)
        )
    }



}