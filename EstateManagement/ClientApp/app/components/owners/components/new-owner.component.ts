import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Property } from '../../../models/Property';
import { OwnersService } from '../../owners/services/owners.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/components/common/api';
import { Message, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Owner } from '../../../models/owner';
import { BaseComponent } from '../../../common/base.component';

@Component({
    templateUrl: './new-owner.component.html',
    selector: 'new-owner',
    providers: [ConfirmationService],
})

export class NewOwnerComponent extends BaseComponent implements OnInit {
    constructor(
        private confirmationService: ConfirmationService,
        private activatedRoute: ActivatedRoute,
        private ownerService: OwnersService,
        private location: Location       
    ) { super(activatedRoute, location) };


    ngOnInit(): void {
        this.detectUrlParam();
        this.wathPathUrl();   
        this.owner = new Owner();
        this.messages = new Array<Message>();
    }

    owner: Owner;
    urlParam: number;
    pageTitle: string = "Owner data";
    isInOwnerDetailsMode: boolean = false;

    @Input() receivedId: number;
    @Output() ownerAddedEvent: EventEmitter<number> = new EventEmitter<number>();

    wathPathUrl(): void {
        if (this.location.isCurrentPathEqualTo("/properties/property-update/" + this.urlParam)) {
            this.downloadOwner(this.receivedId);
            this.isInEditMode = true; 
        }
        else if (this.location.isCurrentPathEqualTo("/properties/property-details/" + this.urlParam)) {
            this.downloadOwner(this.receivedId),
            this.isInEditMode = false;
        }
        else if (this.location.isCurrentPathEqualTo("/owners/owner-details/" + this.urlParam)) {
            this.downloadOwner(this.urlParam);
            this.isInOwnerDetailsMode = true;
            this.isInEditMode = false;
        }
        else if (this.location.isCurrentPathEqualTo("/owners/owner-update/" + this.urlParam)) {
            this.downloadOwner(this.urlParam);
            this.isInOwnerDetailsMode = true;
            this.isInEditMode = true;
        }

    }

    onSubmit(newOwner: Owner): void {
        if ((this.location.isCurrentPathEqualTo("/properties/property-update/" + this.urlParam)) ||
            (this.location.isCurrentPathEqualTo("/owners/owner-update" + this.urlParam))) {
            this.ownerService.updateOwner(newOwner).subscribe(
                id => {
                    this.showMassage(false, 'success', 'Confirmation', false, 'Owner has been update successfully!');
                    this.ownerAddedEvent.emit(id);
                },
                errorMessage => this.showMassage(false, 'warn', 'Information', false, errorMessage)
            )
        }
        else {
            this.ownerService.addOwner(newOwner).subscribe(
                id => {
                    this.showMassage(false, 'success', 'Confirmation', false, 'Owner has been creatded successfully!');
                    this.ownerAddedEvent.emit(id);
                },
                errorMessage => this.showMassage(false, 'warn', 'Information', false, errorMessage)
            )
        }
    }

    detectUrlParam(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.urlParam = params['id'];
        })
    }

    downloadOwner(id: number): void {
        this.ownerService.getOwner(id).subscribe(
            owner => this.owner = owner,
            errorMessage => this.showMassage(true, 'warn', 'Information', false, errorMessage)
        )
    }



}