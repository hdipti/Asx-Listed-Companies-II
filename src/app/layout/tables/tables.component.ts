import { Component } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { LoggerService } from '@asx/core/logger/logger.service';
import { CompanyComponent } from '@asx/core/company/company.component';
import { Company } from '@asx/core/company/company.model';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent {

	companiesArray : Company[] = []; 

    constructor(private logger: LoggerService,
                private companies: CompanyComponent) {
        this.populateTable();
    }

    populateTable() {
        this.companiesArray = this.companies.getCompanyList();
        this.logger.log("companies in table component : " + this.companiesArray.length);
    }
}
