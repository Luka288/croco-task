import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home | Users',
    loadComponent: () =>
      import('./features/users/users.component').then((m) => m.UsersComponent),
  },

  {
    path: 'posts',
    title: 'Posts',
    loadComponent: () =>
      import('./features/posts/posts.component').then((m) => m.PostsComponent),
  },

  {
    path: 'promotions',
    title: 'Promotions',
    loadComponent: () =>
      import('./features/promotions/promotions.component').then(
        (m) => m.PromotionsComponent
      ),
  },

  {
    path: 'todos',
    title: 'User | Todo List',
    loadComponent: () =>
      import('./features/todos/todos.component').then((m) => m.TodosComponent),
  },

  {
    path: '**',
    pathMatch: 'full',
    title: 'Not Found',
    redirectTo: 'home',
  },
];
