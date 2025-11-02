import { ElementRef } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive';

describe('ClickOutsideDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = new ElementRef(document.createElement('div')); 
    const directive = new ClickOutsideDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });
});
