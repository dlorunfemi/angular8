import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  formData: Employee = new Employee();

  readonly APIUrl = 'https://my-json-server.typicode.com/dormynion/angular8';

  private _listeners = new Subject<any>();

  getEmpList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.APIUrl + '/Employee');
  }

  addEmployee(dep: Employee) {
    // Object.keys(this.getDepList()).length;
    return this.http.post(this.APIUrl + '/Employee/', dep);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.APIUrl + '/Employee/' + id);
  }

  updateEmployee(dep: Employee) {
    return this.http.put(this.APIUrl + '/Employee/', dep);
  }

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }
}
