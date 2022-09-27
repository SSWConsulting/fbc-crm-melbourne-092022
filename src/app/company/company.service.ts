import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ICompany } from './icompany';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companies$: BehaviorSubject<ICompany[]> = new BehaviorSubject<ICompany[]>([]);

  API_BASE = 'https://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(private http: HttpClient) {
    this.loadCompanies();
  }

  private loadCompanies() {
    this.http.get<ICompany[]>(`${this.API_BASE}/company`)
      .subscribe((companies: ICompany[]) => {
        this.companies$.next(companies);
      });
  }

  getCompanies(): Observable<ICompany[]> {
    return this.companies$.asObservable();
    // return this.http.get<ICompany[]>(`${this.API_BASE}/company`)
    //   .pipe(
    //     catchError(e => this.handleError<ICompany[]>(e))
    //   );
  }

  deleteCompany(companyId: number) {
    let obs$ = this.http.delete<ICompany>(`${this.API_BASE}/company/${companyId}`)
      .pipe(
        tap(() => console.log('TAP')),
        catchError(e => this.handleError<ICompany>(e))
      ).subscribe(() => {
        this.loadCompanies();
      });
  }

  addCompany(company: ICompany) {
    setTimeout(() => {
      this.http.post<ICompany>(`${this.API_BASE}/company`, company,
      { headers: new HttpHeaders().set('content-type', 'application/json') })
      .pipe(
        catchError(e => this.handleError<ICompany>(e))
      ).subscribe(() => {
        this.loadCompanies();
      });
    }, 2000)
  }

  updateCompany(company: ICompany) {
    this.http.put<ICompany>(`${this.API_BASE}/company/${company.id}`, company,
      { headers: new HttpHeaders().set('content-type', 'application/json') })
      .pipe(
        catchError(e => this.handleError<ICompany>(e))
      ).subscribe(() => {
        this.loadCompanies();
      });
  }

  getCompany(companyId: number): Observable<ICompany> {
    return this.http.get<ICompany>(`${this.API_BASE}/company/${companyId}`)
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
