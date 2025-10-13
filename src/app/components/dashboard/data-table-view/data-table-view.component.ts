import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { ValidateUrls } from 'src/app/helpers/validators/urls.validator';
import { IEntries, IEntry } from 'src/app/models/entry.model';
// import * as fromApp from '../../../store/reducers/app.reducer';
import { DashboardService } from '../dashboard.service';
import { selectEntries } from '../../../store/selectors/entries.selector'
import { invokeEntriesAPI, invokeSaveNewEntryAPI, updateEntryAPI } from 'src/app/store/actions/entries.actions';
import { combineLatest, forkJoin } from 'rxjs';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-data-table-view',
  templateUrl: './data-table-view.component.html',
  styleUrls: ['./data-table-view.component.scss']
})
export class DataTableViewComponent implements OnInit {

  public isEditMode: boolean = false;
  public isViewMode: boolean = false;
  public form: FormGroup = new FormGroup({});
  public newEntryId: number = 0;
  public entries: IEntry[] = [];
  public authOptions: string[] = [];
  public categories: string[] = [];
  public entryId: number = 0;
  public viewParam: string = '';
  public entryToEdit: IEntry = { id: 0, API: '', Description: '', Category: '', Cors: '', HTTPS: '', Link: '', Auth: '' }
  public entries$ = this._store.pipe(select(selectEntries));
  public hasChange: boolean = false;

  constructor(
    private fb: FormBuilder,
    // private _store: Store<fromApp.AppState>,
    private _dashboardService: DashboardService,
    private _router: Router,
    private _activeRouter: ActivatedRoute,
    private _store: Store,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    // console.log(this._activeRouter.params);
    // this._activeRouter.params.subscribe((params) => {
    //   this.entryId = parseInt(params['id']);
    //   if (this.entryId !== undefined && !isNaN(this.entryId)) { this.isEditMode = true; }
    // })


    combineLatest(this._activeRouter.params, this._activeRouter.queryParams)
      .subscribe(res => {
        this.entryId = parseInt(res[0]['id']);
        this.viewParam = res[1]['viewMode'];
        console.log(this.viewParam);
        if (this.viewParam) { this.isViewMode = true; }
        if (this.entryId !== undefined && !isNaN(this.entryId) && !this.viewParam) { this.isEditMode = true; }
      })



    // this._store.dispatch(invokeEntriesAPI());

    this.entries$.subscribe((allEntries: IEntry[]) => {

      this.initForm();

      this.entries = allEntries;
      // console.log(this.entries);
      if (this.entries.length > 0) {

        this.findAuthOptions();
        this.findCategories();

        if (this.isEditMode || this.isViewMode) {
          // this.entryToEdit = this.entries[this.entryId - 1];
          // const ent = this.entries.filter((entry) => entry.id === this.entryId);
          this.entryToEdit = this.entries.filter((entry) => entry.id === this.entryId)[0];
          this.form.patchValue(this.entryToEdit);
          console.log(this.form.controls);
          if (this.isViewMode) {
            for (const control in this.form.controls) {
              console.log(`${control}`);
              this.form.get(`${control}`)?.disable();
            }
          }
        } else {
          this.newEntryId = this.entries[this.entries.length - 1].id + 1;
          // console.log(this.newEntryId);
          this.form.get('id')?.patchValue(this.newEntryId);
        }
      } else {
        this.getTableData();
      }
      this.onCreateGroupFormValueChange();
    })
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
      id: [{ value: 0, disabled: true }, [Validators.required]],
      API: [null, [Validators.minLength(2), Validators.maxLength(10), Validators.required]],
      Auth: [null],
      Category: [null, Validators.required],
      Cors: [null, Validators.required],
      Description: [null, [Validators.minLength(2), Validators.required]],
      HTTPS: [null, Validators.required],
      Link: [null, [ValidateUrls, Validators.required]]
    });


  }

  backToEntries() {
    // this._router.navigate(["/dashboard/data-table"]);
    // console.log(this.hasChange);
    if (this.hasChange) {
      this.dialog.open(DialogComponent);
    } else {
      this._router.navigate(["/dashboard/data-table"]);
    }
  }

  onCreateGroupFormValueChange() {
    const initialValue = this.form.value;
    this.form.valueChanges.subscribe(value => {
      this.hasChange = Object.keys(initialValue).some(key => this.form.value[key] !=
        initialValue[key])
    });
  }

  submit(): void {
    this.form.controls['id'].enable();
    console.log(this.form.value);
    console.log(this.entries);
    this.entries = [...this.entries, this.form.value];
    // this.entries.push(this.form.value);
    // this._dashboardService.setTableDataStore(this.entries);
    if (this.isEditMode) {
      this._store.dispatch(updateEntryAPI({ updateEntryId: this.entryId, updatedEntry: this.form.value }))
    } else {
      this._store.dispatch(invokeSaveNewEntryAPI({ newEntry: this.form.value }));
    }


    this._router.navigate(['/dashboard/data-table']);
  }

  public getTableData = () => {
    this._dashboardService.getTableData()
      .pipe(
        tap((res: IEntry[]) => {
          console.log(res);
          const entries = res;
          this.entries = entries;
          this.findAuthOptions();
          this.findCategories();

          console.log(this.isEditMode)
          if (this.isEditMode || this.isViewMode) {
            this.entryToEdit = this.entries[this.entryId - 1];
            this.form.patchValue(this.entryToEdit);
            this.form.updateValueAndValidity();
            this.form.markAsTouched();
            console.log(this.form.controls);
            if (this.isViewMode) {
              for (const control in this.form.controls) {
                console.log(`${control}`);
                this.form.get(`${control}`)?.disable();
              }
            }
          } else {
            this.newEntryId = entries.length + 1;
            this.form.get('id')?.patchValue(this.newEntryId);
          }
        })
      ).subscribe()


  }

}
