import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageHeaderModule } from './../../shared';

import { HttpModule } from '@asx/core/http/http.module';
//import { HttpComponent } from '@asx/core/http/http.component';
//import { CompanyComponent } from '@asx/core/company/company.component';
import { LoggerService } from '@asx/core/logger/logger.service';

@NgModule({
    imports: [CommonModule, TablesRoutingModule, PageHeaderModule, HttpModule],
    declarations: [TablesComponent],
    providers: [LoggerService]
})
export class TablesModule {}
