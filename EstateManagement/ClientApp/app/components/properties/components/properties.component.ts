import { Component, OnInit, Injectable } from '@angular/core';
import { Property } from '../../../models/Property';
import { PropertiesService } from '../../properties/services/PropertiesService';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
    templateUrl: './properties.component.html'
})

export class PropertiesComponent implements OnInit {
  

    constructor(
        private propertiesService: PropertiesService,
        private router: Router,
    ) { };

    
    properties: Array<Property> = new Array<Property>();
    pageTitle: string = "List of available properties";
    tempInfo: string = "Loading...";
   
    ngOnInit(): void {
        this.downloadProperties();

    }

    

    downloadProperties(): void {
        this.propertiesService.getAllProperties().subscribe(
            propertiesFromDb => {
                if (propertiesFromDb.length == 0) {
                    this.tempInfo = "Records not found.";
                }
                else {
                    this.properties = propertiesFromDb;
                }
            },
            error => console.log(error)
        );
    }

    getProperty(id: number): void {
        this.router.navigate(['./properties/property-details', id]);
    }

    updateProperty(id: number): void {
        this.router.navigate(['./properties/property-update', id]);
    }

    deleteProperty(id: number): void {
        this.propertiesService.deleteProperty(id).subscribe(
            onSuccess => {
                console.log(onSuccess);
                this.properties.splice(this.properties.findIndex(prop => prop.Id == id), 1);
                },
            onError => console.log(onError)
        );
        
    }

    
}