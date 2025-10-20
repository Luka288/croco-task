import { Component, inject, OnInit, signal } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { PostInterface } from '../../core/models/post.models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [DataTableComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly route = inject(ActivatedRoute);

  columns = [
    { header: 'Name', value: (row: PostInterface) => row.userId },
    { header: 'Post Title', value: (row: PostInterface) => row.body },
  ];

  postsData = signal<PostInterface[]>([]);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userId = params['userId'];
      if (userId) {
        this.postsService.getPostByUser(userId).subscribe((posts) => {
          this.postsData.set(posts);
        });
      } else {
        this.postsService.getPosts().subscribe((posts) => {
          this.postsData.set(posts);
        });
      }
    });
  }
}
