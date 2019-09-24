import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/Department';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }
  formData: Department = new Department();

  readonly APIUrl = 'https://my-json-server.typicode.com/dormynion/angular8';

  private _listeners = new Subject<any>();

  getDepList(): Observable<Department[]> {
    return this.http.get<Department[]>(this.APIUrl + '/department');
  }

  addDepartment(dep: Department) {
    // Object.keys(this.getDepList()).length;
    return this.http.post(this.APIUrl + '/Department/', dep);
  }

  deleteDepartment(id: number) {
    return this.http.delete(this.APIUrl + '/department/' + id);
  }

  updateDepartment(dep: Department) {
    return this.http.put(this.APIUrl + '/Department/', dep);
  }

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }
}
