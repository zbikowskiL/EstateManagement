import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../models/Property';
import { PropertiesService } from '../../properties/services/PropertiesService';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SelectItem} from 'primeng/components/common/api';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';


@Component ({
    templateUrl: './property-details.component.html',
    styleUrls: ['../../../base.css'],
    providers: [MessageService]
})

export class PropertyDetailsComponent implements OnInit {
    
    msgs: Message[] = [];
    pageTitle: string;
    propertyForm: FormGroup;
    urlParam: number;
    isInEditionMode: boolean = true;
    property: Property = new Property();
    area : number;
    constructor(
        private propertiesService: PropertiesService,
        private activeRoute: ActivatedRoute,
        private location: Location,
        private formBuilder: FormBuilder,
        private messageService: MessageService
        
    ) { };

    ngOnInit(): void {
        this.detectedUrlParam();
        this.wathPathUrl();   
        this.propertyForm = this.buildPropertyForm();  
        
    }

    //przechwytuje parametr id z Url.
    detectedUrlParam(): void {
        this.activeRoute.params.subscribe((params: Params) => {
            this.urlParam = params['id'];
        });
    };


    wathPathUrl(): void {
        if (this.location.isCurrentPathEqualTo("/properties/new-property")) {
            this.pageTitle = "New property";
        }
        else if (this.location.isCurrentPathEqualTo("/properties/property-update/" + this.urlParam)) {
            this.pageTitle = "Update property";
            this.downloadProperty();
        }
        else {
            this.pageTitle = "Details property";
            this.isInEditionMode = false;
            this.downloadProperty();
        }
    };

    downloadProperty(): void {
        this.propertiesService.getProperty(this.urlParam).subscribe(
            propertyFromDb => this.property = propertyFromDb,
            errorObj => console.log(errorObj)
        );
    }

    cenaMieszkania(id: number): void{
         this.propertiesService.getProperty(id).map((prop) => prop.Area == this.area);
            console.log(this.area);
    }

    onSubmit(propObj: Property): void {
            if (this.location.isCurrentPathEqualTo("/properties/new-property")) {
            propObj.adressId = 4;
            propObj.ownerId = 4;
            
            this.propertiesService.addProperty(propObj).subscribe(
                onSuccess => this.showSuccess(),
                onError => console.log(onError)
            );
        }
        else {
            this.propertiesService.updateProperty(propObj).subscribe(
                onSuccess => console.log(onSuccess),
                onError => console.log(onError)
            );
        }
    };

    goBack(): void {
        this.location.back();
    }

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
             adressId: '',
             ownerId: ''
        });
    }
    showSuccess() {
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'Success Message', detail:'Order submitted'});
    }
}