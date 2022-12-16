import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { ValidateUrls } from 'src/app/helpers/validators/urls.validator';
import { IEntry } from 'src/app/models/entry.model';
import * as fromApp from '../../../store/reducers/app.reducer';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-data-table-view',
  templateUrl: './data-table-view.component.html',
  styleUrls: ['./data-table-view.component.scss']
})
export class DataTableViewComponent implements OnInit {

  public isEditMode: boolean = false;
  public form: FormGroup = new FormGroup({});
  public newEntryId: number = 0;
  public entries: IEntry[] = [];
  public authOptions: string[] = [];
  public categories: string[] = [];
  public entryId: number = 0;
  public entryToEdit: IEntry = { API: '', Description: '', Category: '', Cors: '', HTTPS: '', Link: '', Auth: '' }

  constructor(
    private fb: FormBuilder,
    private _store: Store<fromApp.AppState>,
    private _dashboardService: DashboardService,
    private _router: Router,
    private _activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {

    console.log(this._activeRouter.params);
    this._activeRouter.params.subscribe((params) => {
      console.log(params['id'])
      this.entryId = parseInt(params['id']);
      console.log(this.entryId)
      if(this.entryId !== undefined && !isNaN(this.entryId)) {this.isEditMode = true;}
      console.log(this.isEditMode);
    })


    this.initForm();
    this._store.select('datatable').subscribe((data: any) => {
      const entries = data.entries;
      this.entries = entries;
      if (entries) {

        this.findAuthOptions();
        this.findCategories();

        if(this.isEditMode) {
          this.entryToEdit = this.entries[this.entryId];
          this.form.patchValue(this.entryToEdit);        
        }else {
          this.newEntryId = entries[entries.length - 1].id + 1;
          this.form.get('id')?.patchValue(this.newEntryId);
        }
      } else {
        this.getTableData();
      }
    });
  }


  findCategories() {
    const categories: any = [];
    this.entries.forEach((entry) => {
      if (!categories.includes(entry.Category) && entry.Category !== '') {
        categories.push(entry.Category);
      }
    })
    this.categories = categories;
  }


  findAuthOptions() {
    const authOptions: any = [];
    this.entries.forEach((entry) => {
      if (!authOptions.includes(entry.Auth) && entry.Auth !== '') {
        authOptions.push(entry.Auth);
      }
    })
    this.authOptions = authOptions;
  }

  initForm(): void {
    this.form = this.fb.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      API: [null, [Validators.minLength(2), Validators.maxLength(10), Validators.required]],
      Auth: [null],
      Category: [null, Validators.required],
      Cors: [null, Validators.required],
      Description: [null, [Validators.minLength(2), Validators.required]],
      HTTPS: [null, Validators.required],
      Link: [null, [ValidateUrls, Validators.required]]
    });
  }

  submit(): void {
    this.form.controls['id'].enable();
    this.entries.push(this.form.value);
    this._dashboardService.setTableDataStore(this.entries);
    this._router.navigate(['/dashboard/data-table']);
  }

  getTableData = () => {
    this._dashboardService.getTableData()
      .pipe(
        tap((res) => {
          const entries = res.entries;
          this.entries = entries;
          this.findAuthOptions();
          this.findCategories();

          console.log(this.isEditMode)
          if(this.isEditMode) {
            this.entryToEdit = this.entries[this.entryId];
            this.form.patchValue(this.entryToEdit);
            this.form.updateValueAndValidity();
            this.form.markAsTouched();       
          }else {
            this.newEntryId = entries[entries.length - 1].id + 1;
            this.form.get('id')?.patchValue(this.newEntryId);
          }
        })
      ).subscribe()


  }

}
