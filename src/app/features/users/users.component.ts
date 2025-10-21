import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../core/models/user.models';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { yearsPerPage } from '@angular/material/datepicker';

@Component({
  selector: 'app-users',
  imports: [DataTableComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  private readonly usersService = inject(UserService);
  private readonly router = inject(Router);

  usersData = signal<User[]>([]);

  searchGroup = new FormGroup({
    searchControl: new FormControl('', { nonNullable: true }),
  });

  columns = [
    { header: 'Name', value: (row: User) => row.name },
    { header: 'Username', value: (row: User) => row.username },
    { header: 'Email', value: (row: User) => row.email },
    { header: 'Phone', value: (row: User) => row.phone },
    { header: 'Company', value: (row: User) => row.company.name },
  ];

  userRowActions = [
    {
      label: 'Posts',
      action: (row: User) => this.navigateToPosts(row.id),
    },
    {
      label: 'Todos',
      action: (row: User) => this.navigateToTodo(row.id),
    },
  ];

  ngOnInit(): void {
    this.listenSearch();
    this.allUsers();
  }

  navigateToPosts(userId: number) {
    this.router.navigate(['/posts'], { queryParams: { userId } });
  }

  navigateToTodo(userId: number) {
    this.router.navigate(['/todos'], { queryParams: { userId } });
  }

  listenSearch() {
    this.searchGroup.controls.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((res) => {
        if (!res) {
          this.allUsers();
        }
        this.searchUser(res);
      });
  }

  searchUser(searchParam: string) {
    this.usersService.searchUser(searchParam).subscribe((res) => {
      this.usersData.set(res);
    });
  }

  allUsers() {
    this.usersService.getUsers().subscribe((res) => {
      this.usersData.set(res);
    });
  }
}
