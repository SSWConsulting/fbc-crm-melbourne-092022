import { Injectable } from '@angular/core';
import { ICompany } from './icompany';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() {

  }

  getCompanies(): ICompany[] {
    return [
      { name: 'company 1', email: 'one@test.com', phone: 111 },
      { name: 'company 2', email: 'two@test.com', phone: 222 }
    ];
  }
}
