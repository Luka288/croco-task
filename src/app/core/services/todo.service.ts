import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { TODOS_API_URL } from '../tokens/api.tokens';
import { TodoInterface } from '../models/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);

  constructor(@Inject(TODOS_API_URL) private TODOS_API: string) {}

  getUserTodos(id: number): Observable<TodoInterface[]> {
    return this.http.get<TodoInterface[]>(`${this.TODOS_API}?userId=${id}`);
  }
}
