import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { LoggerService } from '@asx/core/logger/logger.service';
import { CompanyService } from '@asx/core/company/company.service';
import { CacheService } from '@asx/core/http/cache.service';
import { Company } from '@asx/core/company/company.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {  // TODO - add the fetched companies to cache

  companyList : Company[] = [];
  
  corsUrl = 'https://cors-anywhere.herokuapp.com/';
  assetName = 'assets/ASXListedCompanies.csv';
  httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET',
        'Content-Type': 'application/ms-excel'
      }),
      responseType: 'text' as 'text'
  }; 

  constructor(private logger: LoggerService,
              private httpClient: HttpClient,
              private cache : CacheService,
              private companyService : CompanyService) {  }
  
  // Makes call to asx
  getCSVFromASX(url: string, fileName: any) : Company[] {
    this.logger.log("call to asx");
  	this.httpClient
    .get(this.corsUrl + url + fileName, this.httpOptions)
  	  .subscribe(data => { 
  	  this.companyList = this.companyService.processData(data),
  	  err =>  this.handleError(err); 
  	});
     return this.companyList;
  } 

  handleError(err: any) {
    // log the error
    this.logger.error(err);
  }
}
