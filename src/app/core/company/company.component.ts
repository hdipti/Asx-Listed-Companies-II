import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Company } from './company.model';
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
export class CompanyComponent {

  constructor(private logger: LoggerService,
              private companyService : CompanyService) {}

  getCompanyList() {
    this.logger.log("Company Compoment gets the companies : " + this.companyService.companiesArray.length);
	  return this.companyService.companiesArray; //Invokes the call from asx 
  }
}