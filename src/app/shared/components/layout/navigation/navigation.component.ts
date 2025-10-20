import { Component, signal } from '@angular/core';
import { NAVIGATION_ITEMS } from '../../../consts/navigation.constant';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, RouterModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  NAV_ITEMS = NAVIGATION_ITEMS;
  isOpen = signal<boolean>(false);
}
