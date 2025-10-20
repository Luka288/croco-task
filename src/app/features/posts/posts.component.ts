import { Component, inject } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-posts',
  imports: [DataTableComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  private readonly postsService = inject(PostsService);

  postsData = toSignal<any[]>(this.postsService.getPosts());
}
