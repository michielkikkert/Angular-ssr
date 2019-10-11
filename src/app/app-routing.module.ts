import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'path1',
        loadChildren: () => import('./modules/path1/path1.module').then(m => m.Path1Module),
    },
    {
        path: 'path2',
        loadChildren: () => import('./modules/path2/path2.module').then(m => m.Path2Module),
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
