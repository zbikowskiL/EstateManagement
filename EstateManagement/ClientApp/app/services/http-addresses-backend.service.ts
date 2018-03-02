import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Address } from '../models/address';
import { AddressesBackendService } from '../services/addresses-backend.service';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

@Injectable()
export class HttpAddressesBackendService extends AddressesBackendService {
    
    private addAddressUrl: string = "api/addresses/addaddress";
    private getAddressUrl: string = "api/addresses/getaddress?addressId=";
    private getAllAddressesUrl: string = "api/addresses/getalladdresses";
    private updateAddressUrl: string = "api/addresses/updateAddress";

    private jsonContentOptions: RequestOptions;

    constructor(private http: Http) {
        super();
        let headersJson: Headers = new Headers({
            'Content-Type': 'application/json'
        });
        this.jsonContentOptions = new RequestOptions({ headers: headersJson })
    }

    addAddress(newAddress: Address): Observable<number> {
        return this.http.post(this.addAddressUrl, JSON.stringify(newAddress), this.jsonContentOptions)
            .map(response => response.json() as number);
    }
    getAddress(id: number): Observable<Address> {
        return this.http.get(this.getAddressUrl + id, this.jsonContentOptions)
            .map(response => response.json() as Address);
    }
    getAddresses(): Observable<Address[]> {
        return this.http.get(this.getAllAddressesUrl, this.jsonContentOptions)
            .map(response => response.json() as Array<Address>);
    }
    updateAddress(updateAddress: Address): Observable<number> {
        return this.http.put(this.updateAddressUrl, JSON.stringify(updateAddress), this.jsonContentOptions)
            .map(response => response.json() as number);
    }
}