import { Component } from '@angular/core';
import { NAVIGATION_ITEMS } from '../../../consts/navigation.constant';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  NAV_ITEMS = NAVIGATION_ITEMS;
}
