import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appWheelSpin]',
  exportAs: 'appWheelSpin',
})
export class WheelSpinDirective {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  private rotation = 0;

  @Input() sectorCount: number = 10;

  spinToNumber(
    selectedNumber: number,
    spins: number = 5,
    duration: number = 3000
  ) {
    const targetSectorIndex = selectedNumber - 1;
    const sectorAngle = 360 / this.sectorCount;

    const targetRestAngle =
      360 - (targetSectorIndex * sectorAngle + sectorAngle / 2);

    const fullSpins = spins * 360;

    const currentEffectiveAngle = this.rotation % 360;

    let relativeAngleNeeded = targetRestAngle - currentEffectiveAngle;

    if (relativeAngleNeeded < 0) {
      relativeAngleNeeded += 360;
    }

    const randomOffset = Math.random() * 5 - 2.5;

    const totalSpinDelta = fullSpins + relativeAngleNeeded + randomOffset;

    this.rotation += totalSpinDelta;

    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      `transform ${duration / 1000}s cubic-bezier(0.33, 1, 0.68, 1)`
    );

    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `rotate(${this.rotation}deg)`
    );
  }
}
