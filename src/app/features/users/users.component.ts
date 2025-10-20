import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../core/models/user.models';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-users',
  imports: [DataTableComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  private readonly usersService = inject(UserService);

  usersData = toSignal<User[]>(this.usersService.getUsers());

  columns = [
    { header: 'Name', value: (row: User) => row.name },
    { header: 'Username', value: (row: User) => row.username },
    { header: 'Email', value: (row: User) => row.email },
    { header: 'Phone', value: (row: User) => row.phone },
    { header: 'Company', value: (row: User) => row.company.name },
  ];

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(console.log);
  }
}
