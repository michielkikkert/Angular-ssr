import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { delay } from 'rxjs/operators';

import {RunOnServerService} from './serverstate/run-on-server.service';

@Injectable({
    providedIn: 'root'
})
export class TestService {

    constructor(
        private http: HttpClient,
        private runOnServer: RunOnServerService
    ) {}


    getData(): Observable<any> {
        const url = 'https://jsonplaceholder.typicode.com/todos/1';
        return this.http.get(url);
        // return this.runOnServer.register(this.http.get(url), url);
    }

    getOtherData(): Observable<any> {
        const url = 'https://jsonplaceholder.typicode.com/todos/2';
        return this.http.get(url);0
        // return this.runOnServer.register(this.http.get(url), url);
    }

}
