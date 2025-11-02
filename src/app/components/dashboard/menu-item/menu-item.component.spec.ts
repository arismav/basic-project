import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuItemComponent } from './menu-item.component';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { Component, Pipe, PipeTransform } from '@angular/core';

@Component({ template: '' })
class DummyComponent {}

// Mock του translate pipe, για να μην φορτώσουμε το TranslateModule
@Pipe({ name: 'translate' })
class MockTranslatePipe implements PipeTransform {
  transform(value: string): string {
    return `translated:${value}`;
  }
}

describe('MenuItemComponent', () => {
  let component: MenuItemComponent;
  let fixture: ComponentFixture<MenuItemComponent>;
  let router: Router;

  const mockMenuItem = {
    label: 'home',
    icon: 'home',
    routerLink: '/home',
    role: 'admin'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuItemComponent, DummyComponent, MockTranslatePipe],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'home', component: DummyComponent }
        ]),
        MatIconModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: {} }
        }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(MenuItemComponent);
    component = fixture.componentInstance;
    component.menuItem = mockMenuItem;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set menuItemTranslation correctly on init', () => {
    expect(component.menuItemTranslation).toBe('dashboard.sidenav.home');
  });

  it('should render the icon and label text', () => {
    const iconEl = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    const spanEl = fixture.debugElement.query(By.css('.menu-txt')).nativeElement;

    expect(iconEl.textContent.trim()).toBe('home');
    expect(spanEl.textContent.trim()).toContain('translated:dashboard.sidenav.home');
  });


  it('should have correct routerLink on button', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.getAttribute('ng-reflect-router-link')).toBe('/home');
  });
});
