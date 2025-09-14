import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { selectAppState, selectAppStateRoles } from 'src/app/store/selectors/app.selector';

@Directive({
  selector: '[roles]'
})
export class RolesDirective implements OnInit {

  @Input('roles') roles: string | undefined = '';

  constructor(
    private _store: Store<AppState>,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    this._store.select(selectAppState).subscribe((auth) => {
      if (auth)
        this.checkIfRoleExists(auth.user?.roles);
    })
  }

  checkIfRoleExists = (roles: string[] | undefined) => {
    let exists: boolean | undefined = false;
    if (roles) {
      exists = !!roles.find((role: string) => role === this.roles);
      if (exists) {
        this.createOrHide(true);
      } else {
        this.createOrHide(false);
      }
    }
  }

  createOrHide = (flag: boolean) => {
    if (flag) this.viewContainer.createEmbeddedView(this.templateRef);
    if (!flag) this.viewContainer.clear();
  }

}
