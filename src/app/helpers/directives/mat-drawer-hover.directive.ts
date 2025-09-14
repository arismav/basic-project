import { ChangeDetectorRef, Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appMatDrawerHover]'
})
export class MatDrawerHoverDirective {

  constructor(
    private _ch: ChangeDetectorRef
  ) { }

  @HostListener('mouseover')
  onMouseOver() {
    this._ch.detectChanges();
  }

  @HostListener('mouseout')
  onMouseOut() {
    this._ch.detectChanges();
  }

}
