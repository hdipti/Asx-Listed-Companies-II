import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpComponent } from '@asx/core/http/http.component';
import { CompanyComponent } from '@asx/core/company/company.component';

import { LoggerService } from '@asx/core/logger/logger.service';
import { CacheService } from '@asx/core/http/cache.service';
import { HttpService } from '@asx/core/http//http.service';
import { CompanyService } from '@asx/core/company/company.service';


@NgModule({
    imports: [CommonModule],
    exports: [HttpComponent, CompanyComponent],
    declarations: [HttpComponent, CompanyComponent],
    providers: [LoggerService, CacheService, HttpService, CompanyService]
})
export class HttpModule {}
