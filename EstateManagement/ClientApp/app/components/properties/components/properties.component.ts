import { Component, OnInit, Injectable } from '@angular/core';
import { Property } from '../../../models/Property';
import { PropertiesService } from '../../properties/services/PropertiesService';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmationService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../common/base.component';
import { Message } from 'primeng/components/common/api';



@Component({
    templateUrl: './properties.component.html',
    providers: [ConfirmationService],
})

export class PropertiesComponent extends BaseComponent implements OnInit {
  

    constructor(
        private confirmationService: ConfirmationService,
        private propertiesService: PropertiesService,
        private router: Router,
        private location: Location,
        private activatedRoute: ActivatedRoute,
    ) { super(activatedRoute, location) };

    
    properties: Array<Property> = new Array<Property>();
    pageTitle: string = "List of available properties";
   
    ngOnInit(): void {
        this.messages = new Array<Message>();
        this.downloadProperties();

    }

    

    downloadProperties(): void {
        this.propertiesService.getAllProperties().subscribe(
            propertiesFromDb => this.properties = propertiesFromDb,
            errorMessage => this.showMassage(true, 'warn', 'Information', false, errorMessage)
        );
    }

    getProperty(id: number): void {
        this.router.navigate(['./properties/property-details', id]);
    }

    updateProperty(id: number): void {
        this.router.navigate(['./properties/property-update', id]);
    }

    deleteProperty(id: number): void {
        this.confirmationService.confirm({
            message: 'Are you sure that want to delete this property?',
            header: 'Confirmation',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.propertiesService.deleteProperty(id).subscribe(
                    onSuccess => {
                        this.showMassage(false, 'success', 'Confirmation', true, 'Property has been deleted successfully!')
                        this.properties.splice(this.properties.findIndex(prop => prop.Id == id), 1);
                    },
                    errorMessage => this.showMassage(true, 'warn', 'Information', false, errorMessage)
                );
            },
            reject: () => {
                //Jeżeli zrezygnuje to co ma się wykonać ?
            }
        })

        
        
    }

    
}