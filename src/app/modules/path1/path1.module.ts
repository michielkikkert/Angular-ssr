import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Path1Component } from './path1.component';
import { RouterModule } from '@angular/router';
import { routes } from './path1.routes';


@NgModule({
  declarations: [Path1Component],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class Path1Module { }
