import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent<T> {
  @Input() columns: { header: string; value: (row: T) => string | number }[] =
    [];
  @Input() data: T[] = [];
  @Input() rowActions: { label: string; action: (row: T) => void }[] = [];
}
