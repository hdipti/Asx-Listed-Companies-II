import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoggerService } from '@asx/service/logger.service';
import { DataProcessorService } from '@asx/service/data-processor.service';
import { CacheService } from '@asx/core/http/cache.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  httpClient: HttpClient;
  cache: CacheService;
  dataProcessor: DataProcessorService;
  corsUrl = 'https://cors-anywhere.herokuapp.com/';
  httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET',
        'Content-Type': 'application/ms-excel'
      }),
      responseType: 'text' as 'text'
  }; 

  constructor(private logger: LoggerService) {}
  
  getCSVFromASX(url: string, fileName: any) {
  	this.httpClient.get(this.corsUrl + url + fileName, this.httpOptions)
  	  .subscribe(data => { 
  	   this.dataProcessor.processData(data),
  	   err => this.handleError(err)
  	});
   }

   handleError(err: string) {
     // log the error
     this.logger.log(err);
   }

}
