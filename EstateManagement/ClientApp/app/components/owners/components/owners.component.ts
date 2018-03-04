import { Component, OnInit, Injectable } from '@angular/core';
import { Owner } from '../../../models/owner';
import { OwnersService } from '../../owners/services/owners.service';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../common/base.component';


@Component({
    templateUrl: './owners.component.html',
})

export class OwnersComponent extends BaseComponent implements OnInit {
    constructor(
        private ownersService: OwnersService,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private router: Router,
    ) { super(activatedRoute, location) };


    owners: Array<Owner> = new Array<Owner>();
    pageTitle: string = "Owners list";

    ngOnInit(): void {
        this.downloadOwners();
    }

    downloadOwners(): void {
        this.ownersService.getAllOwners().subscribe(
            owners => this.owners = owners,
            errorMessage => this.showMassage(true, 'warn', 'Information', false, errorMessage)
        );
    }

    getOwner(id: number): void {
        this.router.navigate(['./owners/owner-details', id]);
    }

    updateOwner(id: number): void {
        this.router.navigate(['./owners/owner-update', id]);
    }

}