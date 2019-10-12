import { Injectable } from '@angular/core';
import { NGXLoggerMonitor, NGXLogInterface } from 'ngx-logger';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private logger: NGXLogger) {
      this.logger.registerMonitor(new LoggerMonitor())
      this.logger.info('Initializing Logger Service');
    }

  log(message: string){
  	this.logger.info(message);
  }
}

export class LoggerMonitor implements NGXLoggerMonitor {

   onLog(log: NGXLogInterface) {
      console.log('LoggerService', log);
   }
}
