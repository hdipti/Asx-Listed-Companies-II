import { Injectable } from '@angular/core';
import { LoggerService } from '@asx/core/logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export abstract class DataProcessorService {

  constructor(logger: LoggerService) { }

  abstract processData(data); 
 
}