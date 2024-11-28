import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import {environment} from '../../environments/environment';
import {ApiResponse} from '../models/api.response.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getEmployees() : Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl +'/api/employees');
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(this.baseUrl +'/api/employees/' + id);
  }

  createEmployee(employee: Employee): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl +'/api/employees', employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.baseUrl +'/api/employees/' + employee.id, employee);
  }

  deleteEmployee(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl +'/api/employees/' + id);
  }
}
