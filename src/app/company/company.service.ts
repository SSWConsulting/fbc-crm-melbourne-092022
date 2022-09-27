import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      catchError(e => this.handleError<ICompany[]>(e))
      );
  }

  deleteCompany(companyId: number): Observable<ICompany> {
    return this.http.delete<ICompany>(`${this.API_BASE }/company/${companyId}`)
    .pipe(
      catchError(e => this.handleError<ICompany>(e))
    );
  }

  addCompany(company: ICompany): Observable<ICompany> {
    return this.http.post<ICompany>(`${this.API_BASE }/company`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json') })
    .pipe(
      catchError(e => this.handleError<ICompany>(e))
    );
  }

  handleError<T>(e: any): Observable<T> {
    // log the error
    console.error('CompanyService.handleError, ', e);
    return new Observable<T>();
  }
}
