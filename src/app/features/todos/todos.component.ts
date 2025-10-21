import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../../core/services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { TodoInterface } from '../../core/models/todo.models';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-todos',
  imports: [CommonModule, DataTableComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  private readonly todoService = inject(TodoService);
  private readonly route = inject(ActivatedRoute);

  todoData = signal<TodoInterface[]>([]);

  columns = [
    { header: 'userId', value: (row: TodoInterface) => row.userId },
    { header: 'Title', value: (row: TodoInterface) => row.title },
    {
      header: 'Status',
      value: (row: TodoInterface) => (row.completed ? 'Completed' : 'Pending'),
    },
  ];

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((param) => {
      const userId = Number(param.get('userId'));

      if (userId) {
        this.loadtodos(userId);
      }
    });
  }

  loadtodos(id: number) {
    this.todoService.getUserTodos(id).subscribe((res) => {
      this.todoData.set(res);
    });
  }
}
