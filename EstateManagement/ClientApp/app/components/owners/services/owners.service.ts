import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Owner } from '../../../models/owner';
import { OwnersBackendService } from '../../../services/owners-backend.service';

@Injectable()

export class OwnersService {
    constructor(private ownersBackendService: OwnersBackendService) { };

    addOwner(newOwner: Owner): Observable<number> {
        return this.ownersBackendService.addOwner(newOwner);
    }

    getOwner(id: number): Observable<Owner> {
        return this.ownersBackendService.getOwner(id);
    }

    getAllOwners(): Observable<Owner[]> {
        return this.ownersBackendService.getOwners();
    }

    updateOwner(updateOwner: Owner): Observable<number> {
        return this.ownersBackendService.updateOwner(updateOwner);
    }
}

