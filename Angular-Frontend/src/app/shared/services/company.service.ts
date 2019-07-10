import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Company } from './../models/company.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };
  selectedCompany: Company = new Company();
  companies: Company[];

  constructor(private http: HttpClient) { }

  saveCompany(company: Company) {
    return this.http.post(environment.apiBaseUrl + '/company/', company);
  }

  getCompanyList() {
    return this.http.get(environment.apiBaseUrl + '/company/');
  }

  updateCompany(id: string, company: Company) {
    return this.http.put(environment.apiBaseUrl + '/company' + `/${id}/`, company);
  }

  deleteCompany(id: string) {
    return this.http.delete(environment.apiBaseUrl + '/company' + `/${id}/`);
  }

  getCompany(id: string) {
    return this.http.get(environment.apiBaseUrl + '/companylogodownload' + `/${id}/`);
  }

}
