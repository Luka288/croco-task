import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WheelSpinDirective } from '../../core/directives/wheel-spin.directive';
import { single } from 'rxjs';

@Component({
  selector: 'app-promotions',
  imports: [CommonModule, FormsModule, WheelSpinDirective],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
})
export class PromotionsComponent {
  sectorData = signal<{ value: number; color: string }[]>([]);

  selectedNumber = signal<number | null>(1);
  sectorsCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  isSpinning = signal<boolean>(false);

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
      return;
    }

    this.isSpinning.set(true);

    this.wheel.spinToNumber(userNumber, 8, 4000);

    setTimeout(() => {
      this.isSpinning.set(false);
      console.log('ტრიალი დასრულდა. არჩეულია:', userNumber);
    }, 4100);
  }
}
