import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Path2Component } from './path2.component';
import { RouterModule } from '@angular/router';
import { routes } from './path2.routes';


@NgModule({
  declarations: [Path2Component],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class Path2Module { }
