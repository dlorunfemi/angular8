import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';
import { Department } from 'src/app/models/Department';
import { DepartmentService } from 'src/app/services/department.service';
// import { Department } from 'src/app/models/Department';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  displayedColumns: string[] = ['Options', 'DepartmentID', 'DepartmentName'];
  listData: MatTableDataSource<any>;
  
  constructor(
    private service: DepartmentService
  ) {}

  ngOnInit() {
    this.refreshDepList();
  }

  refreshDepList() {
    const dummyData = [

    ];
    this.service.getDepList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
    });


  }

  onEdit(dep: Department) {
    console.log(dep);
  }

  onDelete(id: number) {
    console.log(id);
  }
}
