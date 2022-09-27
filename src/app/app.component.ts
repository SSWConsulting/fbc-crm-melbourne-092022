import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CompanyService } from './company/company.service';
import { ICompany } from './company/icompany';

@Component({
  selector: 'fbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Melbourne 2022';
  companiesCount$!: Observable<number>;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.companiesCount$ = this.companyService.getCompanies()
    .pipe(
      map((companies: ICompany[]) => {
        return companies.length;
      })
    );
  }

}
