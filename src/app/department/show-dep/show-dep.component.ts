import { Component, OnInit, ViewChild } from '@angular/core';

import {
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatDialogConfig,
  MatSnackBar
} from '@angular/material';
import { Department } from 'src/app/models/Department';
import { DepartmentService } from 'src/app/services/department.service';
import { AddDepComponent } from '../add-dep/add-dep.component';
import { EditDepComponent } from '../edit-dep/edit-dep.component';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {
  displayedColumns: string[] = ['Options', 'DepartmentID', 'DepartmentName'];
  listData: MatTableDataSource<any>;

  constructor(
    private service: DepartmentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.service.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshDepList();
    });
  }

  @ViewChild(MatSort, null) sort: MatSort;

  ngOnInit() {
    this.refreshDepList();
  }

  refreshDepList() {
    this.service.getDepList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    });
  }

  onEdit(dep: Department) {
    this.service.formData = dep
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    this.dialog.open(EditDepComponent, dialogConfig);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete?')) {
      this.service.deleteDepartment(id).subscribe(res => {
        this.refreshDepList();
        this.snackBar.open(res.toString(), '', {
          duration: 5000,
          verticalPosition: 'top'
        });
      });
    }
  }


  applyFilter(v: string) {
    this.listData.filter = v.trim().toLocaleLowerCase();
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    this.dialog.open(AddDepComponent, dialogConfig);
  }
}
