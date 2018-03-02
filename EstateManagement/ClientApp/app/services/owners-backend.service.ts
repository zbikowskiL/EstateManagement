import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../models/owner';

@Injectable()

export abstract class OwnersBackendService {
    abstract addOwner(newOwner: Owner): Observable<number>;

    abstract getOwner(id: number): Observable<Owner>;

    abstract getOwners(): Observable<Owner[]>;

    abstract updateOwner(updateOwner: Owner): Observable<number>;
   
}