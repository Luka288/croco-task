import { Component, inject, OnInit, signal } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { PostInterface } from '../../core/models/post.models';
import { ActivatedRoute } from '@angular/router';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';
import { MatDialog } from '@angular/material/dialog';
import { PostModalComponent } from '../../shared/components/post-modal/post-modal.component';

@Component({
  selector: 'app-posts',
  imports: [DataTableComponent, PostCardComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);

  isUserPosts = signal<boolean>(false);

  columns = [
    { header: 'Name', value: (row: PostInterface) => row.userId },
    { header: 'Post Title', value: (row: PostInterface) => row.body },
  ];

  actions = [
    {
      label: 'Details',
      action: (row: PostInterface) => this.openModal(row),
    },
  ];

  postsData = signal<PostInterface[]>([]);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userId = params['userId'];
      if (userId) {
        this.postsService.getPostByUser(userId).subscribe((posts) => {
          this.postsData.set(posts);
          this.isUserPosts.set(true);
        });
      } else {
        this.postsService.getPosts().subscribe((posts) => {
          this.postsData.set(posts);
          this.isUserPosts.set(false);
        });
      }
    });
  }

  openModal(modalData: PostInterface) {
    this.dialog.open(PostModalComponent, {
      width: '450px',
      data: modalData,
    });
  }
}
