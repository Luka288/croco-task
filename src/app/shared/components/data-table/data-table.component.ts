import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { TruncatePipe } from '../../../core/pipes/truncate.pipe';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule, MatTableModule, TruncatePipe],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent<T> implements OnInit {
  @Input() columns: { header: string; value: (row: T) => string | number }[] =
    [];
  @Input() data: T[] = [];
  @Input() rowActions: { label: string; action: (row: T) => void }[] = [];

  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = this.columns.map((col) => col.header);

    if (this.rowActions.length) {
      this.displayedColumns.push('actions');
    }
  }
}
