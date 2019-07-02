import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from './../../../shared/models/employee.model';
import { EmployeeService } from './../../../shared/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeList: Employee[];
  companyId: string;
  empMessage: string;
  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phoneRegex = '[0-9]{10}';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private httpClient: HttpClient,
              private spinner: NgxSpinnerService,
              private employeeService: EmployeeService, ) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.employeeService.selectedEmployee.companyId = this.companyId;
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.employeeService.selectedEmployee = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
      companyId: this.companyId
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.id === '') {
      this.employeeService.saveEmployee(form.value).subscribe((res) => {
        this.resetForm();
        this.refreshEmployeeList();
        this.toastr.success('Successfully Saved!');
      },
      err => {
        this.toastr.error(err.error);
        console.log(err);
      });
    } else {
      this.employeeService.updateEmployee(form.value.id, form.value).subscribe((res) => {
        this.resetForm();
        this.refreshEmployeeList();
        this.toastr.success('Successfully Updated!');
      },
      err => {
        this.toastr.error('Error!');
        console.log(err);
      });
    }
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.employeeService.deleteEmployee(id).subscribe((res) => {
        this.resetForm();
        this.refreshEmployeeList();
        this.toastr.success('Successfully Deleted!');
      },
      err => {
        this.toastr.error('Error!');
        console.log(err);
      });
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList(this.companyId).subscribe((res) => {
      if (res['status']) {
        if (res['data']['employee']) {
          this.employeeList = [];
          for (let i in res['data']['employee']) {
            const data: Employee = {
              id: res['data']['employee'][i]['id'],
              firstName: res['data']['employee'][i]['first_name'],
              lastName: res['data']['employee'][i]['last_name'],
              email: res['data']['employee'][i]['email'],
              phoneNo: res['data']['employee'][i]['phone_number'],
              companyId: res['data']['employee'][i]['company_id']
            };
            this.employeeList.push(data);
          }
          this.employeeService.employees = this.employeeList;
        }
      }
      if (this.employeeService.employees.length === 0) {
        this.empMessage = 'No employees added';
      } else {
        this.empMessage = '';
      }
    },
    err => {
      this.toastr.error('Error!');
      console.log(err);
    });
  }

}
