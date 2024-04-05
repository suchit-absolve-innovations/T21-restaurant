import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './Pages/home/home.module';
import { LayoutModule } from './layouts/layout/layout.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './shared/helpers/jwt.interceptor';
import { DatePipe } from '@angular/common';
import { AuthModule } from './Pages/auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireModule } from '@angular/fire/compat';
import { MessagingService } from './shared/service/messaging-service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    LayoutModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AngularFireAuthModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAtgPbLrU_XnfTwplgsLKmoNKLjxHI6tFY',
      authDomain: 'zigykart-b0119.firebaseapp.com',
      projectId: 'zigykart-b0119',
      storageBucket: 'zigykart-b0119.appspot.com',
      messagingSenderId: '666871617978',
      appId: '1:666871617978:web:d54082e877d697b5f42583',
      measurementId: 'G-LD79BMXQWR',
    }),
    AngularFireMessagingModule,
    AuthModule,
    ReactiveFormsModule,
  ],
  providers: [
    MessagingService,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
