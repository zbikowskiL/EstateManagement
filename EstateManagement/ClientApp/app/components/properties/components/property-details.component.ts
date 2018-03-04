import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Property } from '../../../models/Property';
import { PropertiesService } from '../../properties/services/PropertiesService';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/components/common/api';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Owner } from '../../../models/owner';
import { BaseComponent } from '../../../common/base.component';


@Component ({
    templateUrl: './property-details.component.html',
    styleUrls: ['../../../base.css'],
    providers: [MessageService]
})

export class PropertyDetailsComponent extends BaseComponent implements OnInit {
    constructor(
        private propertiesService: PropertiesService,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private formBuilder: FormBuilder,
        private messageService: MessageService

    ) { super(activatedRoute, location) };

    ngOnInit(): void {
        this.detectedUrlParam();
        this.wathPathUrl();   
        this.propertyForm = this.buildPropertyForm();
        this.messages = Array<Message>();
    }

    pageTitle: string;
    propertyForm: FormGroup;
    urlParam: number;
    ownerBtnTitle = 'Owner data';
    addressBtnTitle = 'Address';
    isInEditMode: boolean = true;

    owner: Owner = new Owner();
    property: Property = new Property();

    isUpdatePage: boolean = false;
    isNewOwnerModeActivated: boolean = false;
    isNewAddressModeActivated: boolean = false;

    ownerAddedEvent(id: number): void {
        this.property.ownerId = id;
    }
    addressAddedEvent(id: number): void {
        this.property.addressId = id;
    }

    activateNewAddressMode(): void {
        this.isNewAddressModeActivated == true ? this.isNewAddressModeActivated = false : this.isNewAddressModeActivated = true;
    }

    activateNewOwnerMode(): void {
        this.isNewOwnerModeActivated == true ? this.isNewOwnerModeActivated = false : this.isNewOwnerModeActivated = true;
    }

    //przechwytuje parametr id z Url.
    detectedUrlParam(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.urlParam = params['id'];
        });
    };


    wathPathUrl(): void {
        if (this.location.isCurrentPathEqualTo("/properties/new-property/")) {
            this.pageTitle = "New property";
            this.ownerBtnTitle = "Add the owner";
            this.addressBtnTitle = "Add the address";
            this.isInEditMode = true;
        }
        else if (this.location.isCurrentPathEqualTo("/properties/property-update/" + this.urlParam)) {
            this.pageTitle = "Update property";
            this.ownerBtnTitle = "Update the owner";
            this.addressBtnTitle = "Update the address";
            this.downloadProperty();
            this.isInEditMode = true;
        }
        else {
            this.pageTitle = "Details property";
            this.isInEditMode = false;
            this.downloadProperty();
        }
    };

    downloadProperty(): void {
        this.propertiesService.getProperty(this.urlParam).subscribe(
            propertyFromDb => this.property = propertyFromDb,
            errorMessage => this.showMassage(true, 'warn', 'Information', false, errorMessage)
        );
    }

    onSubmit(propObj: Property): void {
        if ((propObj.addressId == undefined || propObj.addressId < 0) || (propObj.ownerId == undefined || propObj.ownerId < 0)) {
            return this.showMassage(true, 'warn', 'Warning', false, 'Before submiting property you need to creat owner and address first!')
        }
            if (this.location.isCurrentPathEqualTo("/properties/new-property")) {
            //propObj.addressId = 4; do usunięcia po testach
            //propObj.ownerId = 4; do usunięcia po testach
            
            this.propertiesService.addProperty(propObj).subscribe(
                onSuccess => this.showMassage(false, 'success', 'Confirmation', false, 'Property has been created successfully!'),
                errorMessage => this.showMassage(false, 'warn', 'Information', false, errorMessage)
            );
        }
        else {
            this.propertiesService.updateProperty(propObj).subscribe(
                onSuccess => this.showMassage(false, 'success', 'Confirmation', false, 'Property has been update successfully!'),
                errorMessage => this.showMassage(true, 'warn', 'Information', false, errorMessage)
            );
        }
    };

    buildPropertyForm(){
        return this.formBuilder.group({
             Id: '',
             Type: ['', Validators.required],
             Description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
             Rooms: ['', [Validators.required, Validators.minLength(1)]],
             Area: ['', Validators.minLength(2)],
             Washer: ['', Validators.required],
             Refrigerator: ['', Validators.required],
             Iron: ['', Validators.required],
            //s
             addressId: '',
             ownerId: ''
        });
    }
   
}