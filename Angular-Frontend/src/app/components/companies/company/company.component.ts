import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Company } from './../../../shared/models/company.model';
import { environment } from '../../../../environments/environment';
import { CompanyService } from './../../../shared/services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  companyList: Company[];
  comMessage: string;
  // tslint:disable-next-line:max-line-length
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  imageUrl = 'assets/img/logo.png';
  logoUrl$: Observable<string | null>;

  constructor(private router: Router,
    private toastr: ToastrService,
    private httpClient: HttpClient,
    private spinner: NgxSpinnerService,
    private companyService: CompanyService, ) { }

  ngOnInit() {
    this.resetForm();
    this.refreshCompanyList();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.companyService.selectedCompany = {
      id: '',
      name: '',
      email: '',
      logoPath: '',
      webSite: ''
    };
    this.logoUrl$ = null;
  }

  onSubmit(form: NgForm) {
    if (form.value.id === '') {
      this.companyService.saveCompany(form.value).subscribe((res) => {
        this.resetForm();
        this.refreshCompanyList();
        this.toastr.success('Successfully Saved!');
      },
        err => {
          this.toastr.error(err.error);
          console.log(err);
        });
    } else {
      this.companyService.updateCompany(form.value.id, form.value).subscribe((res) => {
        this.resetForm();
        this.refreshCompanyList();
        this.toastr.success('Successfully Updated!');
      },
        err => {
          this.toastr.error('Error!');
          console.log(err);
        });
    }
  }

  onEdit(company: Company) {
    this.companyService.selectedCompany = Object.assign({}, company);
    this.getCompanyLogoUrl(company.id);
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.companyService.deleteCompany(id).subscribe((res) => {
        this.resetForm();
        this.refreshCompanyList();
        this.toastr.success('Successfully Deleted!');
      },
        err => {
          this.toastr.error('Error!');
          console.log(err);
        });
    }
  }

  refreshCompanyList() {
    this.companyService.getCompanyList().subscribe((res) => {
      if (res) {
        this.companyList = [];
        for (let i in res) {
          const data: Company = {
            id: res[i]['id'],
            name: res[i]['name'],
            email: res[i]['email'],
            webSite: res[i]['web_site'],
            logoPath: res[i]['logo_path']
          };
          this.companyList.push(data);
        }
        this.companyService.companies = this.companyList;
      }
      if (this.companyService.companies.length === 0) {
        this.comMessage = 'No companies added';
      } else {
        this.comMessage = '';
      }
    },
      err => {
        this.toastr.error('Error!');
        console.log(err);
      });
  }

  addEmployee(companyId) {
    this.router.navigate(['home/employees', companyId]);
  }

  private uploadCompanyLogo(event, companyId, company: Company) {
    this.spinner.show();
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.logoUrl$ = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const fileSize = fileList[0].size;
      const filetype = fileList[0].type;
      if (fileSize > 1024 * 1024 * 3) {
        this.toastr.error('File size should be less than 3 MB');
        this.spinner.hide();
        return false;
      }
      if (!filetype.match('image/jpeg')) {
        this.toastr.error('Please upload only jpg files!');
        this.spinner.hide();
        return false;
      }
      const formData: FormData = new FormData();

      formData.append('logo', file, file.name);
      formData.append('companyId', companyId);

      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      const uploadurl = environment.apiBaseUrl + '/uploadcompanylogo';

      this.httpClient.post(uploadurl, formData, { headers })
        .subscribe(
          (data: any) => {
            this.spinner.hide();
            this.toastr.success('Successfully Uploaded!');
            this.companyService.selectedCompany = Object.assign({}, company);
          },
          error => {
            this.spinner.hide();
            this.toastr.error('There is a Problem Uploading!');
            console.log(error);
          }
        );
    }
  }

  getCompanyLogoUrl(id: string) {
    this.companyService.getCompany(id).subscribe((res) => {
      // tslint:disable-next-line:no-string-literal
      this.logoUrl$ = res['company']['logo_path'];
    },
      err => {
        console.log(err);
      });
  }

}
