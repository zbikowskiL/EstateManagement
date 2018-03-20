import { Component, OnInit, Injectable } from '@angular/core';
import { TypeRatioReport, PropertyPerCityRatioReport } from '../../../models/report';
import { ReportsService } from '../../reports/services/reports.service';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../common/base.component';


@Component({
    templateUrl: './reports.component.html',
})

export class ReportsComponent extends BaseComponent implements OnInit {
    constructor(
        private reportsService: ReportsService,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private router: Router,
    ) { super(activatedRoute, location) };

    data: any;
    pageTitle: string;
    isDataReady: boolean = false;
    isInRaportOneMode: boolean = false;
    isInRaportTwoMode: boolean = false;


    ngOnInit(): void {
        this.wathPathUrl();
    }

    wathPathUrl(): void {
        if (this.location.isCurrentPathEqualTo("/reports/type-report")) {
            this.pageTitle = "Ratio of the number of apartments to the number of houses:";
            this.isInRaportOneMode = true;
            this.getTypesRatioReport();
        }
        else if (this.location.isCurrentPathEqualTo("/reports/properties-report")) {
            this.pageTitle = "Number of properties in individual cities:";
            this.isInRaportTwoMode = true;
            this.getPropertiesPerCityReport();
        }
    }

    getTypesRatioReport(): void {
        this.reportsService.getTypeRatio().subscribe(
            returnData => {
                this.isDataReady = true;
                this.data = {
                    labels: ["Number of houses", "Number of flats"],
                    datasets: [
                        {
                            data: [returnData.houses, returnData.flats],
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB"
                            ],
                            hoverBackgroundColor: [
                                "#FF6384",
                                "#36A2EB"
                            ]
                        }]
                };
            },
            errorMessage => this.showMassage(true, 'warn', 'Information', false, errorMessage)
        );

    }

    getPropertiesPerCityReport(): void {
        this.reportsService.getPropertiesPerCityRatio().subscribe(
            returnData => {
                let cityArray = Array<string>();
                let propAmounts = Array<number>();
                this.isDataReady = true;

                for (let elem of returnData) {
                    cityArray.push(elem.city);
                    propAmounts.push(elem.amount);
                };
                this.data = {
                    labels: cityArray,
                        datasets: [
                            {
                                label: 'Number of properties',
                                backgroundColor: '#42A5F5',
                                borderColor: '#1E88E5',
                                data: propAmounts
                            },
                            
                        ]
                    }
            },
            errorMessage => this.showMassage(true, 'warn', 'Information', false, errorMessage)
        )
    }

}
