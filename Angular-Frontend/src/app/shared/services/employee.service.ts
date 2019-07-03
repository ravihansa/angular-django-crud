import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Employee } from './../models/employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: 'True' }) };
  selectedEmployee: Employee = new Employee();
  employees: Employee[];

  constructor(private http: HttpClient) { }

  saveEmployee(employee: Employee) {
    return this.http.post(environment.apiBaseUrl + '/employee/', employee);
  }

  getEmployeeList(id: string) {
    return this.http.get(environment.apiBaseUrl + '/employee/company' + `/${id}/`);
  }

  updateEmployee(id: string, employee: Employee) {
    return this.http.put(environment.apiBaseUrl + '/employee' + `/${id}/`, employee);
  }

  deleteEmployee(id: string) {
    return this.http.delete(environment.apiBaseUrl + '/employee' + `/${id}/`);
  }

}
