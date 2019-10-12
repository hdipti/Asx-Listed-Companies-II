import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { LoggerService } from '@asx/service/logger.service';

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.scss']
})
export class HttpComponent implements OnInit {

  asxUrl = 'http://www.asx.com.au/asx/research/';
  fileName = 'ASXListedCompanies.csv';
  httpService: HttpService;
  constructor(private logger: LoggerService ) {}

  ngOnInit() {
  	this.httpService.getCSVFromASX(this.asxUrl, this.fileName);
  }

}
