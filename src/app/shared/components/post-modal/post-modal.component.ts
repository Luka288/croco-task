import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostInterface } from '../../../core/models';

@Component({
  selector: 'app-post-modal',
  imports: [],
  templateUrl: './post-modal.component.html',
  styleUrl: './post-modal.component.scss',
})
export class PostModalComponent {
  readonly dialogRef = inject(MatDialogRef<PostModalComponent>);
  readonly data = inject(MAT_DIALOG_DATA) as PostInterface;
}
