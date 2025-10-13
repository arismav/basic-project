import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DashboardMainComponent } from './components/dashboard/dashboard-main/dashboard-main.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { MaterialModule } from './material.module';
import { AuthComponent } from './components/auth/auth/auth.component';
import { ActionReducer, ActionReducerMap, MetaReducer, State, StoreModule } from '@ngrx/store';
import * as fromApp from './store/reducers/authenticate.reducer'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { customTranslate } from './helpers/translate/customTranslate.loader';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { StyleManagerService } from './style-manager.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DialogComponent } from './components/shared/dialog/dialog.component';
import { AuthenticateEffects } from './store/effects/authenticate.effect';
import { AppState, reducers } from './store/app.states';
import { HttpResponseInterceptor } from './interceptors/http.interceptor';
import { LoadingService } from './helpers/services/loader.service';
import { LoadingInterceptor } from './interceptors/loader.interceptor';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { localStorageSync, rehydrateApplicationState } from 'ngrx-store-localstorage';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { SingInContainerComponent } from './components/auth/sing-in-container/sing-in-container.component';
import { SignInComponent } from './components/auth/sing-in-container/sing-in/sign-in.component';
import { RolesService } from './helpers/services/roles.service';
import { MatDialogComponent } from './components/shared/mat-dialog/mat-dialog.component';
import { LanguageService } from './services/language.service';
import { MatDialogBtnComponent } from './components/shared/mat-dialog-btn/mat-dialog-btn.component';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
// const reducerss: ActionReducerMap<AppState> = {auth}

export function localStorageSyncReducer(reducerss: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['auth', 'appconfigs'],rehydrate: true})(reducerss);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
@NgModule({ declarations: [
        AppComponent,
        AuthComponent,
        SignInComponent,
        LoadingSpinnerComponent,
        NotFoundComponent,
        DialogComponent,
        ForgotPasswordComponent,
        SingInContainerComponent,
        MatDialogComponent,
        MatDialogBtnComponent
        // HoverTxtBtnComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreModule.forFeature('auth', reducers.auth),
        StoreModule.forFeature('appconfigs', reducers.appconfigs),
        EffectsModule.forRoot([AuthenticateEffects]),
        AngularFireModule.initializeApp(environment.firebase),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        MaterialModule,
        TranslateModule,
        // Initializing TranslateModule with loader
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader, // Main provider for loader
                useClass: customTranslate, // Custom Loader
                deps: [HttpClient], // Dependencies which helps serving loader
            }
        }),
        // EffectsModule.forRoot([]),
        // StoreModule.forFeature([reducers]),
        // EffectsModule.forFeature([AuthenticationEffect]),
        StoreDevtoolsModule.instrument({ connectInZone: true }),
        MatPasswordStrengthModule.forRoot()], providers: [
        StyleManagerService,
        LanguageService,
        RolesService,
        LoadingService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
