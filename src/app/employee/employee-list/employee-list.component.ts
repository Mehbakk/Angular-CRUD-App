import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/service/employee.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/model/api.response';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Observable<ApiResponse>;

  constructor(private employeeService: EmployeeService,
    private router: Router) {


    }

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();

  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.employees = this.employeeService.getEmployees();
        },
        error => console.log(error));
  }

  updateEmployee(id: number){
    this.router.navigate(['update', id]);
  }


}
