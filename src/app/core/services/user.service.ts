import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { USERS_API_URL } from '../tokens/api.tokens';
import { map, Observable } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  constructor(@Inject(USERS_API_URL) private USERS_ENDPOINT: string) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.USERS_ENDPOINT)
      .pipe(map((res) => res.map((user) => this.splitName(user))));
  }

  fetchUserById(id: number) {
    return this.http.get<User[]>(`${this.USERS_ENDPOINT}?userId=${id}`);
  }

  searchUser(searchParam: string): Observable<User[]> {
    return this.http
      .get<User[]>(this.USERS_ENDPOINT)
      .pipe(
        map((users) =>
          users
            .map((user) => this.splitName(user))
            .filter(
              (user) =>
                user.name.toLowerCase().includes(searchParam.toLowerCase()) ||
                user.username
                  .toLowerCase()
                  .includes(searchParam.toLowerCase()) ||
                user.email.toLowerCase().includes(searchParam.toLowerCase())
            )
        )
      );
  }

  splitName(user: User) {
    const [firstName, ...lastNameParts] = user.name.split(' ');
    return { ...user, name: firstName, lastName: lastNameParts.join(' ') };
  }
}
