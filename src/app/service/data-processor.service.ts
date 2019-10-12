import { Injectable } from '@angular/core';
import { LoggerService } from '@asx/service/logger.service';

@Injectable({
  providedIn: 'root'
})
export class DataProcessorService {

  companiesArray : Company[] = [];
  headerValue = "Company";
  constructor(private logger: LoggerService) { }

   processData(data) {
     this.populateCompanies(data);
   }

  populateCompanies(data) {
    
    let companyCSVArray = (<string>data).split(/\r\n|\n/);
      for (let i = 0; i < companyCSVArray.length-1; i++) {
        if(this.isHeader(companyCSVArray, i)) {
          console.log('i inside if : '  + i);
          this.populateAsxCompanies(companyCSVArray, i+1);
          break;
        }
        console.log('i end of for : ' + i);
      } 
  }

  isHeader(companyCSVArray : string[], i : number) : boolean {
    if(companyCSVArray[i].includes(this.headerValue)){
      return true;
    }
    return false;
  }

  populateAsxCompanies(companyCSVArray : string[], i : number){
    for (let j = i; j < companyCSVArray.length-1; j++) {
      this.addtoCompanyArray((<string>companyCSVArray[j]).split(','));
    }
  }
  
  addtoCompanyArray(curruntCompany : string[]){
    let company: Company = new Company();  
    company.companyName = curruntCompany[0].replace(/['"]+/g, '').trim(); 
    company.asxCode = curruntCompany[1].replace(/['"]+/g, '').trim(); 
    company.industryGroup = curruntCompany[2].replace(/['"]+/g, '').trim();  

    this.companiesArray.push(company);  
  }
  
}

export class Company {
  companyName: string;
  asxCode: string;
  industryGroup: string; 
}