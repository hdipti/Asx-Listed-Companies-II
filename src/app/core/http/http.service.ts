import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

import { LoggerService } from '@asx/core/logger/logger.service';
import { CompanyService } from '@asx/core/company/company.service';
import { CacheService } from '@asx/core/http/cache.service';

//temp
import { Company } from '@asx/core/company/Company';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  companyService: CompanyService;
  cache : CacheService;
  //temp
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
              private httpClient: HttpClient) {
    this.cache = new CacheService(this.logger);
    this.companyService = new CompanyService(this.logger);
  }
  
  // Makes call to asx
  getCSVFromASX(url: string, fileName: any) {
    this.logger.log("call to asx");
  	this.httpClient
    .get(this.corsUrl + url + fileName, this.httpOptions)
  	  .subscribe(data => { 
  	  this.companyService.processData(data),
  	  err =>  this.handleError(err); 
  	});
  } 
   
  // temp : gets file from assets folder when not connected to internet
  /*
  getCSVFromASX(url: string, fileName: any) : Company[] {
    this.logger.log("table from file");
    this.httpClient.get(this.assetName, {responseType: 'text'})
      .subscribe(data => {
      //this.cache.put(url, data); // put(request, response)
      //this.logger.log("cached response" + this.cache.get(url));
      this.companyList = this.companyService.processDataFromFile(data),
      err => this.handleError(err);
    });
    return this.companyList;
  } */

  handleError(err: any) {
    // log the error
    this.logger.error(err);
  }
}
