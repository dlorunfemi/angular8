import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/Department';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient,
    // private 
  ) { }

  readonly APIUrl = '';

  getDepList(): Observable<Department[]> {
    return this.http.get<Department[]>(this.APIUrl + '/department');
  }
}
