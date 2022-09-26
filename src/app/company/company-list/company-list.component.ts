import { Component, OnInit } from '@angular/core';
import { ICompany } from '../icompany';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies: ICompany[] = [];
  constructor() {

  }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.companies = [
      { name: 'company 1', email: 'one@test.com', phone: 111 },
      { name: 'company 2', email: 'two@test.com', phone: 222 }
    ];
  }

}
