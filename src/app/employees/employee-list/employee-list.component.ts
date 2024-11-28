import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import {ApiResponse} from '../../models/api.response.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: ApiResponse) => {
        this.employees = response.result || response;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      }
    });
  }


  // Supprime un employé
  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        alert('Employee deleted successfully');
        this.loadEmployees(); // Recharge la liste des employés
      });
    }
  }

}
