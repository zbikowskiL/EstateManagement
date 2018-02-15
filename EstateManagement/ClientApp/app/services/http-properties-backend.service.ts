﻿import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Property } from '../models/Property';
import { PropertiesBackendService } from '../services/properties-backend.service';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

@Injectable()
export class HttpPropertiesBackendService extends PropertiesBackendService {
   
    private addPropertyUrl: string = "api/property/addproperty";
    private getPropertyUrl: string = "api/property/getproperty?propertyId=";
    private getAllPropertiesUrl: string = "api/property/getallproperties";
    private updatePropertyUrl: string = "api/property/updateproperty";
    private deletePropertyUrl: string = "api/property/deleteproperty?propertyId=";

    private jsonContentOptions: RequestOptions;

    constructor(private http: Http) {
        super();
        let headersJson: Headers = new Headers({
            'Content-Type': 'application/json',
        });
        this.jsonContentOptions = new RequestOptions({ headers: headersJson })
    }

    addproperty(newProperty: Property): Observable<number> {
        return this.http.post(this.addPropertyUrl, JSON.stringify(newProperty), this.jsonContentOptions)
            .map(response => response.json() as number);
    }
    getProperty(id: number): Observable<Property> {
        return this.http.get(this.getPropertyUrl + id, this.jsonContentOptions)
            .map(response => response.json());
    }
    getProperties(): Observable<Property[]> {
        return this.http.get(this.getAllPropertiesUrl, this.jsonContentOptions)
            .map(response => response.json());
    }
    updateProperty(updateProperty: Property): Observable<number> {
        return this.http.post(this.updatePropertyUrl, JSON.stringify(updateProperty), this.jsonContentOptions)
            .map(response => response.json() as number);
    }
    deleteProperty(propertyId: number): Observable<number> {
        return this.http.get(this.deletePropertyUrl + propertyId, this.jsonContentOptions)
            .map(response => response.json() as number);
    }
   

}