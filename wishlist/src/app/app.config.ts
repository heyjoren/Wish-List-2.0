import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { routes } from './app.routes';
// import { environment } from './DB/environments/environment'
import { environment } from './DB/environments/environment.development';

export const appConfig: ApplicationConfig = {
  // providers: [provideRouter(routes)]

  // Wish list
  // providers: [
  //   provideRouter(routes),  
  //   provideAnimationsAsync(),
  //   provideHttpClient()
  // ]

  // Wish list 2.0
  providers: [
    provideRouter(routes),  
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment)),
      provideFirestore(()=>getFirestore()),
      provideAuth(() => getAuth())
    ])
  ]
};
