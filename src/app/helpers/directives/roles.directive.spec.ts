import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { RolesDirective } from './roles.directive';

describe('RolesDirective', () => {
  let storeMock: jasmine.SpyObj<Store<AppState>>;
  let templateRefMock: jasmine.SpyObj<TemplateRef<any>>;
  let viewContainerMock: jasmine.SpyObj<ViewContainerRef>;

  beforeEach(() => {
    // Mock του store
    storeMock = jasmine.createSpyObj('Store', ['select', 'dispatch']);

    // Mock του templateRef (δεν χρειάζεται μεθόδους συνήθως)
    templateRefMock = {} as jasmine.SpyObj<TemplateRef<any>>;

    // Mock του ViewContainerRef
    viewContainerMock = jasmine.createSpyObj('ViewContainerRef', [
      'createEmbeddedView',
      'clear',
    ]);
  });

  it('should create an instance', () => {
    const directive = new RolesDirective(storeMock, templateRefMock, viewContainerMock);
    expect(directive).toBeTruthy();
  });
});
