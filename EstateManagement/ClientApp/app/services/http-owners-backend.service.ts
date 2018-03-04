import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Owner } from '../models/owner';
import { OwnersBackendService } from '../services/owners-backend.service';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

@Injectable()
export class HttpOwnersBackendService extends OwnersBackendService {


    private addOwnerUrl: string = "api/owners/addowner";
    private getOwnerUrl: string = "api/owners/getowner?ownerId=";
    private getAllOwnersUrl: string = "api/owners/getallowners";
    private updateOwnerUrl: string = "api/owners/updateowner";

    private jsonContentOptions: RequestOptions;

    constructor(private http: Http) {
        super();
        let headresJson: Headers = new Headers({
            'Content-Type': 'application/json'
        });
        this.jsonContentOptions = new RequestOptions({ headers: headresJson })
    }


    addOwner(newOwner: Owner): Observable<number> {
        return this.http.post(this.addOwnerUrl, JSON.stringify(newOwner), this.jsonContentOptions)
            .map(response => response.json() as number);
    }
    getOwner(id: number): Observable<Owner> {
        return this.http.get(this.getOwnerUrl + id, this.jsonContentOptions)
            .map(response => response.json());
    }
    getOwners(): Observable<Owner[]> {
        return this.http.get(this.getAllOwnersUrl, this.jsonContentOptions)
            .map(response => response.json());
    }

    updateOwner(updateOwner: Owner): Observable<number> {
        return this.http.put(this.updateOwnerUrl, JSON.stringify(updateOwner), this.jsonContentOptions)
            .map(response => response.json() as number);
    }
}