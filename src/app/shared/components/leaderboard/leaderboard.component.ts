import { Component, OnInit, signal } from '@angular/core';
import { weekType, LeaderboardItem } from '../../models/index';
import { DataTableComponent } from '../data-table/data-table.component';

@Component({
  selector: 'app-leaderboard',
  imports: [DataTableComponent],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent implements OnInit {
  leaderBoard = signal<LeaderboardItem[]>([]);
  activeWeek = signal<'ALL' | weekType>('ALL');
  weeks = ['I', 'II', 'III', 'IV', 'ALL'];

  columns = [
    {
      header: 'ID',
      value: (row: LeaderboardItem) => row.customerId,
    },

    {
      header: 'Name',
      value: (row: LeaderboardItem) => row.loginName,
    },

    {
      header: 'Place',
      value: (row: LeaderboardItem) => row.place,
    },

    {
      header: 'Week',
      value: (row: LeaderboardItem) => row.week,
    },
  ];

  ngOnInit(): void {
    this.loadBoard();
  }

  loadBoard() {
    const weeks: weekType[] = ['I', 'II', 'III', 'IV'];
    const boardItems: LeaderboardItem[] = [];
    const extraUsers: number = 60;

    weeks.forEach((week) => {
      for (let i = 0; i < 10; i++) {
        boardItems.push({
          customerId: Math.floor(Math.random() * 1000),
          loginName: `User_${week}${i + 1}`,
          place: boardItems.length + 1,
          week: week,
        });
      }
    });

    for (let i = 0; i < extraUsers; i++) {
      boardItems.push({
        customerId: Math.floor(Math.random() * 1000),
        loginName: `User${i + 1}`,
        place: i + 1,
        week: weeks[Math.floor(Math.random() * weeks.length)],
      });
    }

    this.leaderBoard.set(boardItems);
  }

  filterByWeek(week: weekType | string) {
    this.activeWeek.set(week as weekType);
  }

  filteredLeaderboard() {
    const week = this.activeWeek();
    if (week === 'ALL') return this.leaderBoard();
    return this.leaderBoard().filter((item) => item.week === week);
  }
}
