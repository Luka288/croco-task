import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { USERS_API_URL } from '../tokens/api.tokens';
import { Observable } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClinet = inject(HttpClient);

  constructor(@Inject(USERS_API_URL) private USERS_ENDPOINT: string) {}

  getUsers(): Observable<User[]> {
    return this.httpClinet.get<User[]>(this.USERS_ENDPOINT);
  }
}
