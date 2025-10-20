import { Component } from '@angular/core';
import { NAVIGATION_ITEMS } from '../../../consts/navigation.constant';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  NAV_ITEMS = NAVIGATION_ITEMS;
}
