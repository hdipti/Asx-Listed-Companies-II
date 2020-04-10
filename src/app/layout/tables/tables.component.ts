import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient } from '@angular/common/http';

import { LoggerService } from '@asx/core/logger/logger.service';
import { HttpComponent } from '@asx/core/http/http.component';
import { CompanyComponent } from '@asx/core/company/company.component';
import { Company } from '@asx/core/company/Company';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {

	companiesArray : Company[] = []; 

    constructor(private logger: LoggerService,
                private httpClient: HttpClient,
                private company : CompanyComponent,
                private http: HttpComponent) { } 

    // temp : works for call to asx but not for local populate file
    // otherwise ngOnInit(){}
    ngOnInit(){}
    /* ngOnInit() {
        this.logger.log("Http component : " + this.http);
        this.companiesArray = this.http.getCompanies(); //this.http.getCompanies().pipe(delay(2000));
    	this.logger.log("Invoke service to fetch companies list from ASX");
    	//this.companiesArray = this.company.getCompanyList();
        this.logger.log("companies in table component : " + this.companiesArray.length);
    } */

    populateTable(){
        this.companiesArray = this.company.getCompanyList();
        this.logger.log("companies in table component : " + this.companiesArray.length);
    }
}
