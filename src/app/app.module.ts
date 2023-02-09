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
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SignInComponent } from './components/auth/sing-in/sign-in.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DashboardMainComponent } from './components/dashboard/dashboard-main/dashboard-main.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { MaterialModule } from './material.module';
import { AuthComponent } from './components/auth/auth/auth.component';
import { StoreModule } from '@ngrx/store';
// import * as fromApp from './store/reducers/app.reducer';
import * as fromApp from './store/reducers/authenticate.reducer'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { customTranslate } from './helpers/translate/customTranslate.loader';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { StyleManagerService } from './style-manager.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { appReducer } from './store/reducers/app.reducer';
import { DialogComponent } from './components/shared/dialog/dialog.component';
import { authenticationReducer } from './store/reducers/authentication.reducer';
import { AuthenticationEffect } from './store/effects/authentication.effect';
import { AuthenticateEffects } from './store/effects/authenticate.effect';
import { reducers } from './store/app.states';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignInComponent,
    LoadingSpinnerComponent,
    NotFoundComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // StoreModule.forRoot(fromApp.appReducer),
    StoreModule.forRoot({}),
    StoreModule.forFeature('appState', reducers.auth),
    EffectsModule.forRoot([AuthenticateEffects]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MaterialModule,
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
    EffectsModule.forFeature([AuthenticationEffect]),
    StoreDevtoolsModule.instrument(),
    

  ],
  providers: [StyleManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
