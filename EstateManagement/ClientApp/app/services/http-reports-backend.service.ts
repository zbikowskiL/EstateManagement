import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TypeRatioReport, PropertyPerCityRatioReport } from '../models/report';
import { ReportsBackendService } from '../services/reports-backend.service';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

@Injectable()
export class HttpReportsBackendService extends ReportsBackendService {
    private getTypeRatioReportUrl: string = "api/reports/GetTypesRatioReport";
    private getPropertiesPerCityReportUrl: string = "api/reports/GetPropertiesPerCity";
   
    private jsonContentOptions: RequestOptions;

    constructor(private http: Http) {
        super();
        let headersJson: Headers = new Headers({
            'Content-Type': 'application/json'
        });
        this.jsonContentOptions = new RequestOptions({ headers: headersJson })
    }

    geGetTypesRatiotReport(): Observable<TypeRatioReport> {
        return this.http.get(this.getTypeRatioReportUrl, this.jsonContentOptions)
            .map(response => response.json() as TypeRatioReport)
    }
    getPropertiesPerCityReport(): Observable<PropertyPerCityRatioReport[]> {
        return this.http.get(this.getPropertiesPerCityReportUrl, this.jsonContentOptions)
            .map(response => response.json() as Array<PropertyPerCityRatioReport>)
    }
}