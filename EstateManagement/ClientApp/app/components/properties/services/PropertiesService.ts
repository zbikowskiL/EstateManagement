import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Property } from '../../../models/Property';
import { PropertiesBackendService } from '../../../services/properties-backend.service';

@Injectable()

export class PropertiesService {
    constructor(private propertiesBackendService: PropertiesBackendService) { }

    addProperty(newProperty: Property): Observable<number> {
        return this.propertiesBackendService.addProperty(newProperty);
    }

    getProperty(propertyId: number): Observable<Property> {
        return this.propertiesBackendService.getProperty(propertyId);
    }

    getAllProperties(): Observable<Property[]> {
        return this.propertiesBackendService.getProperties();
    }

    updateProperty(updateProperty: Property): Observable<number> {
        return this.propertiesBackendService.updateProperty(updateProperty);
    }

    deleteProperty(propertyId: number): Observable<number> {
        return this.propertiesBackendService.deleteProperty(propertyId);
    }
}