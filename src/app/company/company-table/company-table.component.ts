import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICompany } from '../icompany';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyTableComponent implements OnInit {

  @Input()
  companies: ICompany[] = [];

  @Output()
  deleteButtonClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteCompany(companyId: number) {
    this.deleteButtonClicked.emit(companyId);
  }

  logChanges(){
    console.log("CHANGES !!!");
  }
}
