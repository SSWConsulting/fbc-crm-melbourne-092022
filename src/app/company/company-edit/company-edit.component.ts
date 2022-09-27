import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CompanyService } from '../company.service';
import { ICompany } from '../icompany';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  companyForm!: FormGroup;
  companyId!: number;
  isNewCompany!: boolean;

  name: UntypedFormControl = this.companyForm?.get('name') as UntypedFormControl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = !this.companyId;

    if (!this.isNewCompany) {
      this.companyService.getCompany(this.companyId)
        .subscribe(company => {
          this.companyForm.patchValue(company)
        });
    }

    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['info@ssw.com.au'],
      phoneRequired: [true],
    });

    this.companyForm.get('phoneRequired')?.valueChanges.subscribe(
      checkboxValue => {
        if (checkboxValue) {
          this.companyForm.get('phone')?.setValidators(Validators.required)
        } else {
          this.companyForm.get('phone')?.removeValidators(Validators.required)
        }
        this.companyForm.get('phone')?.updateValueAndValidity()
      }
    );
  }

  saveChanges() {
    let company: ICompany = { ...this.companyForm.value, id: this.companyId };
    let action$: Observable<ICompany>;

    if (this.isNewCompany) {
      this.companyService.addCompany(company);
    } else {
      this.companyService.updateCompany(company);
    }

    this.router.navigateByUrl('/company/list');
    // this.router.navigate(['/company', 'list']); // strictly equivalent
  }
}
