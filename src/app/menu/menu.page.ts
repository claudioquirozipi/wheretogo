import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  constructor(
    private navController: NavController,
    private storage: Storage,
    private menuController: MenuController
  ) {}
  logout() {
    this.storage.remove('isAuthenticated');
    this.navController.navigateRoot('/login');
  }
  closeMenu() {
    this.menuController.close();
  }
}
