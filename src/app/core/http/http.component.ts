import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { LoggerService } from '@asx/core/logger/logger.service';
import { Company } from '@asx/core/company/company.model';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.scss']
})
export class HttpComponent {

  companyList : Company[] = [];

  asxUrl = 'http://www.asx.com.au/asx/research/';
  fileName = 'ASXListedCompanies.csv';
  
  constructor(private logger : LoggerService,
              private httpClient: HttpClient,
              private httpService: HttpService) { }

  fetchCompanies() {
   this.logger.log("Fetching companies from ASX");
   this.companyList = this.httpService.getCSVFromASX(this.asxUrl, this.fileName);
   this.logger.log("companyList size at fetch : " + this.companyList.length);
  }            

  getCompanies() : Company[] {
    this.logger.log("company list length in http component : " + this.companyList.length);
    return this.companyList;
  }
}
