import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WheelSpinDirective } from '../../core/directives/wheel-spin.directive';
import { single } from 'rxjs';
import { LeaderboardComponent } from '../../shared/components/leaderboard/leaderboard.component';

@Component({
  selector: 'app-promotions',
  imports: [
    CommonModule,
    FormsModule,
    WheelSpinDirective,
    LeaderboardComponent,
  ],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent {
  sectorData = signal<{ value: number; color: string }[]>([]);

  selectedNumber = signal<number | null>(null);
  sectorsCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  isSpinning = signal<boolean>(false);
  errorText = signal<string>('');

  @ViewChild('wheel') wheel!: WheelSpinDirective;

  constructor() {
    this.sectorData.set(
      this.sectorsCount.map((item) => ({
        value: item,
        color: this.getRandomColor(),
      }))
    );
  }

  ngOnInit() {}

  getRandomColor(): string {
    let color = Math.floor(Math.random() * 16777215).toString(16);

    return '#' + color.padStart(6, '0');
  }

  spinWheel(userNumber: number) {
    if (this.isSpinning()) return;

    if (userNumber === null || userNumber < 1 || userNumber > 10) {
      this.errorText.set('აღნიშნული სექტორი ვერ მოიძებნა');
      return;
    }

    this.isSpinning.set(true);
    this.errorText.set('');

    this.wheel.spinToNumber(userNumber, 8, 4000);

    setTimeout(() => {
      this.isSpinning.set(false);
    }, 4100);
  }
}
