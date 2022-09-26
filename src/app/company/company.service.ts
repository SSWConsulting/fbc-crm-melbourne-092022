import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ICompany } from './icompany';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(private http: HttpClient) {

  }

  getCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(`${this.API_BASE }/company`)
    .pipe(
      catchError(this.handleError<ICompany[]>)
      );
  }
  deleteCompany(companyId: number): Observable<ICompany> {
    return this.http.delete<ICompany>(`${this.API_BASE }/company/${companyId}`)
    .pipe(
      catchError(this.handleError<ICompany>)
    );
  }

  handleError<T>(e: any): Observable<T> {
    // log the error
    console.error('CompanyService.handleError, ', e);
    return new Observable<T>();
  }
}
