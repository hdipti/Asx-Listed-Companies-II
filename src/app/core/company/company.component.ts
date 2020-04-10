import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Company } from './Company';
import { CompanyService } from '@asx/core/company/company.service';
import { LoggerService } from '@asx/core/logger/logger.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

 logger: LoggerService;
 companyService : CompanyService;
 companiesArray : Company[] = [];

  constructor(private companyLogger: LoggerService) {
    this.logger = companyLogger;
    this.companyService = new CompanyService(this.logger);
  }

  ngOnInit(){}

  getCompanyList() {
    this.logger.log("Company Compoment gets the companies : " + this.companiesArray.length);
	  return this.companyService.getList(); //Invokes the call from asx 
    return this.companiesArray;
  }
}