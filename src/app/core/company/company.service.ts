import { Injectable } from '@angular/core';

import { Company } from '@asx/core/company/company.model';
import { DataProcessorService } from '@asx/core/company/data-processor.service';
import { LoggerService } from '@asx/core/logger/logger.service';
import { CacheService } from '@asx/core/http/cache.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends DataProcessorService {

  companiesArray : Company[] = [];

  headerValue = "Company";

  constructor(private logger: LoggerService) {
    super(logger);
  }

  processData(data) : Company[] {
    this.populateCompanies(data);
    return this.companiesArray;
  }

  populateCompanies(data) {
    let companyCSVArray = (<string>data).split(/\r\n|\n/);
      for (let i = 0; i < companyCSVArray.length-1; i++) {
        if(this.isHeader(companyCSVArray, i)) { 
          this.logger.log('i inside if : '  + i);
          this.populateAsxCompanies(companyCSVArray, i+1);
          break;
        }
        this.logger.log('i end of for : ' + i);
      } 
  }

  isHeader(companyCSVArray : string[], i : number) : boolean {
    if(companyCSVArray[i].includes(this.headerValue)){
      return true;
    }
    return false;
  }

  populateAsxCompanies(companyCSVArray : string[], i : number) {
    for (let j = i; j < companyCSVArray.length-1; j++) {
      this.addtoCompanyArray((<string>companyCSVArray[j]).split(','));
    }
    this.logger.log('number of companies : ' + this.companiesArray.length);
  }
  
  addtoCompanyArray(curruntCompany : string[]){
    let company: Company = new Company();  
    company.companyName = curruntCompany[0].replace(/['"]+/g, '').trim(); 
    company.asxCode = curruntCompany[1].replace(/['"]+/g, '').trim(); 
    company.industryGroup = curruntCompany[2].replace(/['"]+/g, '').trim();  

    this.companiesArray.push(company);
  }
}