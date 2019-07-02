import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from './../../shared/services/company.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  companyId: string;
  companyName: string;

  constructor(private route: ActivatedRoute,
              private companyService: CompanyService) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.getCompanyName(this.companyId);
  }

  getCompanyName(id: string) {
    this.companyService.getCompany(id).subscribe((res) => {
     // tslint:disable-next-line:no-string-literal
     this.companyName = res['company']['name'];
    },
    err => {
      console.log(err);
    });
  }
}
