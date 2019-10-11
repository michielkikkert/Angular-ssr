import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { RunOnServerService } from './serverstate/run-on-server.service';


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
        return this.runOnServer.register(this.http.get(url), url);

    }

    getOtherData(): Observable<any> {

        const url = 'https://jsonplaceholder.typicode.com/todos/2';
        return this.runOnServer.register(this.http.get(url), url);

    }

}
