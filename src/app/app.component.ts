import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'ssr';
    data: any;

    constructor(
        private testservice: TestService
    ) {}

    ngOnInit(): void {

        this.testservice.getData().subscribe( data => {
            this.data = data;
        });


    }

    getTitle(index) {
        console.log('Jow!');
        return 'Bla ' + index;
    }


}
