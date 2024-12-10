import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-create-employee',
  standalone: false,
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  employee: Employee = new Employee();
  selectedFile: File | null = null;

  constructor(private employeeService: EmployeeService, private router: Router) {}
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  saveEmployee(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.employee.name);  // Append name directly
      formData.append('email', this.employee.email);  // Append email directly
      formData.append('phone', this.employee.phone);  // Append phone directly
      formData.append('department', this.employee.department);  // Append department directly
      formData.append('image', this.selectedFile, this.selectedFile.name);  // Append image file
      console.log('Sending FormData:', Array.from(formData.entries()));
      this.employeeService.createEmployee(formData).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (err) => console.error('Error occurred:', err) // Log any error
      });
    }
  }
}
