import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//**PrimeNG Modules**\\
import { CalendarModule } from 'primeng/calendar';
import { GrowlModule } from 'primeng/growl';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule, ChartModule } from 'primeng/primeng';


import '../../node_modules/chart.js/dist/Chart.js'

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';

//**Properties Section**\\
import { PropertiesComponent } from './components/properties/components/properties.component';
import { PropertiesService } from './components/properties/services/PropertiesService';
import { PropertiesBackendService } from './services/properties-backend.service';
import { HttpPropertiesBackendService } from './services/http-properties-backend.service';
import { PropertyDetailsComponent } from './components/properties/components/property-details.component';

//**Address Section**\\
import { AddressesComponent } from './components/addresses/components/addresses.component';
import { AddressesService } from './components/addresses/services/addresses.service';
import { AddressesBackendService } from './services/addresses-backend.service';
import { HttpAddressesBackendService } from './services/http-addresses-backend.service';
import { NewAddressComponent } from './components/addresses/components/new-address.component';

//**Owner Section**\\
import { OwnersComponent } from './components/owners/components/owners.component';
import { OwnersService } from './components/owners/services/owners.service';
import { OwnersBackendService } from './services/owners-backend.service';
import { HttpOwnersBackendService } from './services/http-owners-backend.service';
import { NewOwnerComponent } from './components/owners/components/new-owner.component';

//**Reports Section**\\
import { ReportsComponent } from './components/reports/components/reports.component';
import { ReportsService } from './components/reports/services/reports.service';
import { ReportsBackendService } from './services/reports-backend.service';
import { HttpReportsBackendService } from './services/http-reports-backend.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        PropertiesComponent,
        PropertyDetailsComponent,
        AddressesComponent,
        NewAddressComponent,
        OwnersComponent,
        NewOwnerComponent,
        ReportsComponent
        
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        CalendarModule,
        ReactiveFormsModule,
        GrowlModule,
        ProgressSpinnerModule,
        ConfirmDialogModule,
        ChartModule,
        
        
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },

            { path: 'properties', component: PropertiesComponent },
            { path: 'properties/new-property', component: PropertyDetailsComponent },
            { path: 'properties/property-details/:id', component: PropertyDetailsComponent },
            { path: 'properties/property-update/:id', component: PropertyDetailsComponent },

            { path: 'addresses', component: AddressesComponent },
            { path: 'addresses/new-address', component: NewAddressComponent },
            { path: 'addresses/address-details/:id', component: NewAddressComponent },
            { path: 'addresses/address-update/:id', component: NewAddressComponent },

            { path: 'owners', component: OwnersComponent },
            { path: 'owners/owner-update/:id', component: NewOwnerComponent },
            { path: 'owners/owner-details/:id', component: NewOwnerComponent },

            { path: 'reports/type-report', component: ReportsComponent },
            { path: 'reports/properties-report', component: ReportsComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        AddressesService,
        { provide: AddressesBackendService, useClass: HttpAddressesBackendService },

        PropertiesService,
        { provide: PropertiesBackendService, useClass: HttpPropertiesBackendService },
       
        OwnersService,
        { provide: OwnersBackendService, useClass: HttpOwnersBackendService },

        ReportsService,
        { provide: ReportsBackendService, useClass: HttpReportsBackendService },
    ]

})
export class AppModuleShared {
}
