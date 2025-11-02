import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { DashboardService } from '../dashboard.service';
import { LanguageService } from 'src/app/helpers/services/language.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth } from '@angular/fire/auth';
import { AppState } from 'src/app/store/app.states';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  // 🧩 Mock dependencies
  const mockAuthService = {
    logout: jasmine.createSpy('logout').and.returnValue(Promise.resolve())
  };

  const mockDashboardService = {
    getCartItems: jasmine.createSpy('getCartItems').and.returnValue(of([{ id: 1 }, { id: 2 }])),
    setComponentPortal: jasmine.createSpy('setComponentPortal')
  };

  const mockLanguageService = {
    langs: { en: 'English', el: 'Greek' }
  };

  const mockAngularFireAuth = { currentUser: null };
  const mockAuth = {}; // Firebase Auth mock

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatSlideToggleModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({}, {}),
        TranslateModule.forRoot(), // ✅ Fixes the translate pipe
      ],
      declarations: [HeaderComponent],
      providers: [
        provideMockStore({
          initialState: {
            app: {
              configs: { darkMode: false, language: 'en' },
              user: { email: 'mock@test.com', username: 'MockUser' } // ✅ mock store user
            }
          } as unknown as AppState
        }),
        { provide: AuthService, useValue: mockAuthService },
        { provide: DashboardService, useValue: mockDashboardService },
        { provide: LanguageService, useValue: mockLanguageService },
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: Auth, useValue: mockAuth },
        OverlayContainer
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    // ✅ Prevent undefined `authUser` errors
    component.authUser = { email: 'test@test.com', username: 'Tester' };

    fixture.detectChanges();
  });

  it('should create HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cart items amount from DashboardService', () => {
    expect(mockDashboardService.getCartItems).toHaveBeenCalled();
    expect(component.cartItemsAmount).toBe(2);
  });

  it('should toggle dark mode on', () => {
    component.darkMode = false;
    component.toggleDarkMode({ checked: true });
    expect(component.darkMode).toBeTrue();
  });

  it('should dispatch language change when switchLang is called', () => {
    const dispatchSpy = spyOn(component['_store'], 'dispatch');
    const fakeEvent = { target: { value: 'el' } };
    component.switchLang(fakeEvent);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(component.currentLang).toBe('el');
  });

  it('should call logout from AuthService', async () => {
    await component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});
