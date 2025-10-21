import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { POSTS_API_URL } from '../tokens/api.tokens';
import { map, Observable, switchMap } from 'rxjs';
import { PostInterface } from '../models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly http = inject(HttpClient);
  private readonly userService = inject(UserService);

  constructor(@Inject(POSTS_API_URL) private API_ENDPOINT: string) {}

  getPosts(): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>(this.API_ENDPOINT).pipe(
      switchMap((posts) =>
        this.userService.getUsers().pipe(
          map((users) =>
            posts.map((post) => ({
              ...post,
              name: users.find((u) => u.id === post.userId)?.name || 'Unknown',
            }))
          )
        )
      )
    );
  }

  getPostByUser(id: number): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>(`${this.API_ENDPOINT}?userId=${id}`);
  }
}
