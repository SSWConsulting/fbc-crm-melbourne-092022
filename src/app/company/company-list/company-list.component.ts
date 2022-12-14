import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { CompanyService } from '../company.service';
import { ICompany } from '../icompany';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies$: Observable<ICompany[]> = of([]);

  constructor(private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.companies$ = this.companyService.getCompanies();
  }

  deleteCompany(companyId: number) {
   this.companyService.deleteCompany(companyId);
  }

}
