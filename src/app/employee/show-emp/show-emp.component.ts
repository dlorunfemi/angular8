import { Component, OnInit, ViewChild } from '@angular/core';

import {
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatDialogConfig,
  MatSnackBar
} from '@angular/material';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/Employee.service';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {
  displayedColumns: string[] = [
    'Options',
    'EmployeeID',
    'EmployeeName',
    'Department',
    'MailID',
     'DOJ'
    ];
  listData: MatTableDataSource<any>;

  constructor(
    private service: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.service.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshEmpList();
    });
  }

  @ViewChild(MatSort, null) sort: MatSort;

  ngOnInit() {
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.service.getEmpList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    });
  }

  onEdit(emp: Employee) {
    this.service.formData = emp;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    this.dialog.open(EditEmpComponent, dialogConfig);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete?')) {
      this.service.deleteEmployee(id).subscribe(res => {
        this.refreshEmpList();
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
    this.dialog.open(AddEmpComponent, dialogConfig);
  }
}
