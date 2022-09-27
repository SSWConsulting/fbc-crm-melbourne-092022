import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
      // load company details
    }

    // this.companyForm = new FormGroup({
    //   name: new FormControl(),
    //   email: new FormControl('@ssw.com.au', [Validators.email, Validators.required]),
    //   phone: new FormControl(),
    //   contacts: new FormArray([]),
    //   addressDetails: new FormGroup({
    //     streetName: new FormControl(),
    //     streetNumber: new FormControl()
    //   })
    // });

    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [],
      email: ['info@ssw.com.au'],
      phoneRequired: [true]
    });

    this.companyForm.get('name')?.valueChanges.subscribe(
      x => console.log(x)
    );

    // this.companyForm.controls['name'].setValue('SSW', { triggerEvent: true });
    // this.companyForm.get('name')?.setValue('SSW');

  }

  saveChanges() {

    console.log(this.companyForm)
    // let newCompany: ICompany = this.companyForm.value;
    // this.companyService.addCompany(newCompany).subscribe(company => {
    //   this.router.navigateByUrl('/company/list')
    // });
  }
}
