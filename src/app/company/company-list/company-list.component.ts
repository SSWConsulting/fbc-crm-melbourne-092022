import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { CompanyService } from '../company.service';
import { ICompany } from '../icompany';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit, OnDestroy {

  companies$: Observable<ICompany[]> = of([]);
  subscription: Subscription | undefined;

  constructor(private companyService: CompanyService) {
  }


  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.companies$ = this.companyService.getCompanies();
    this.subscription = this.companies$.subscribe(companies => {
      console.log('subscribing to our own observable!');
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
