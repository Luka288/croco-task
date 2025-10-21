import { Component, Input } from '@angular/core';
import { PostInterface, User } from '../../../core/models';

@Component({
  selector: 'app-post-card',
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input() cardData: PostInterface | null = null;
}
