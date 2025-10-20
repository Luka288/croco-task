import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { POSTS_API_URL } from '../tokens/api.tokens';
import { Observable } from 'rxjs';
import { PostInterface } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly http = inject(HttpClient);

  constructor(@Inject(POSTS_API_URL) private API_ENDPOINT: string) {}

  getPosts(): Observable<any> {
    return this.http.get(this.API_ENDPOINT);
  }

  getPostByUser(userId: number): Observable<PostInterface[]> {
    return this.http.get<PostInterface[]>(
      `${this.API_ENDPOINT}?userId=${userId}`
    );
  }
}
