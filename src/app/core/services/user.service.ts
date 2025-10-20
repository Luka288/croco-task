import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { USERS_API_URL } from '../tokens/api.tokens';
import { User } from '../models/user.models';
import { Observable } from 'rxjs';

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
