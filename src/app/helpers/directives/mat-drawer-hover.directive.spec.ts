import { ChangeDetectorRef } from '@angular/core';
import { MatDrawerHoverDirective } from './mat-drawer-hover.directive';

describe('MatDrawerHoverDirective', () => {
  it('should create an instance', () => {
    it('should create an instance', () => {
      const cdrMock = {
        detectChanges: jasmine.createSpy('detectChanges'),
        markForCheck: jasmine.createSpy('markForCheck')
      } as unknown as ChangeDetectorRef;
  
      const directive = new MatDrawerHoverDirective(cdrMock);
      expect(directive).toBeTruthy();
    });
  });
});
