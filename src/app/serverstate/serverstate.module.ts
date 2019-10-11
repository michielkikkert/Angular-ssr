import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserTransferStateModule, makeStateKey, TransferState } from '@angular/platform-browser';
import { STORE_KEY1 } from './state.key';
import { select, Store } from '@ngrx/store';
import * as testActions from '../store';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrowserTransferStateModule
    ]
})
export class ServerstateModule {

    constructor(private transferState: TransferState, private store: Store<any>) {
        this.store.pipe( select( testActions.getTestData ) ).subscribe( data => {
            this.transferState.set( makeStateKey('test1'), data);
        })
    }
}
