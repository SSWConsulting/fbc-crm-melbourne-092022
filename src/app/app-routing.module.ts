import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'company/list', pathMatch: 'full' },
  // Method A
  { path: 'company/list', component: CompanyListComponent },

  // Method B
  // { path: 'company', children:
    // [
      // { path: 'list', component: CompanyListComponent }
    // ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
