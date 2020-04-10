import { Injectable } from '@angular/core';
import { NGXLoggerMonitor, NGXLogInterface } from 'ngx-logger';
import { NGXLogger
 } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private logger: NGXLogger) {
      this.logger.registerMonitor(new LoggerMonitor());      
      this.logger.info('Initializing Logger Service');
    }

  info(message: any){
  	this.logger.info(message);
  }

  log(message: any){
    this.logger.log(message);
  }

  error(message: any){
    this.logger.error(message);
  }

  debug(message: any){
    this.logger.debug(message);
  }

  trace(message: any){
    this.logger.trace(message);
  }


}

export class LoggerMonitor implements NGXLoggerMonitor {

   onLog(log: NGXLogInterface) {
      console.log('LoggerService', log);
   }
}
