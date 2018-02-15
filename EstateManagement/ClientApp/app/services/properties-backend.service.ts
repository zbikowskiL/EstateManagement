import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../models/Property';

@Injectable()

export abstract class PropertiesBackendService {
    abstract addproperty(newProperty: Property): Observable<number>;

    abstract getProperty(id: number): Observable<Property>;

    abstract getProperties(): Observable<Property[]>;

    abstract updateProperty(updateProperty: Property): Observable<number>;

    abstract deleteProperty(propertyId: number): Observable<number>;
}



