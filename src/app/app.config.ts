import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { POSTS_API_URL, USERS_API_URL } from './core/tokens/api.tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    provideRouter(routes),

    {
      provide: USERS_API_URL,
      useValue: 'https://jsonplaceholder.typicode.com/users',
    },

    {
      provide: POSTS_API_URL,
      useValue: 'https://jsonplaceholder.typicode.com/posts',
    },
  ],
};
