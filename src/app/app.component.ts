import { Component, OnInit } from '@angular/core';
import { LoggerService } from '@asx/core/logger/logger.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor( private logger: LoggerService) {
    	this.logger.log("App Component message logged to console");
    }

    ngOnInit() {

    	
    }
}
