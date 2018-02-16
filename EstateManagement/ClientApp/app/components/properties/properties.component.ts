import { Component, OnInit } from '@angular/core';
import { Property } from '../../models/Property';
import { PropertiesService } from '../properties/services/PropertiesService';

@Component({
    templateUrl: './properties.component.html'
})

export class PropertiesComponent implements OnInit {

    constructor(private propertiesService: PropertiesService) {

    };

    testowaZmienna: string = "Pozdrowienia z Componentu";

    ngOnInit(): void {

        this.propertiesService.getAllProperties().subscribe(
            props => { console.log("Properties:", props) },
            error => { console.log("Error:", error) }
        )
    }


}