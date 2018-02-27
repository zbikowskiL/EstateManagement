import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../models/address';

@Injectable()

export abstract class AddressesBackendService {
    abstract addAddress(newAddress: Address): Observable<number>;

    abstract getAddress(id: number): Observable<Address>;

    abstract getAddresses(): Observable<Address[]>;

    abstract updateAddress(updateAddress: Address): Observable<number>;

}