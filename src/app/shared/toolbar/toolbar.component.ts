import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MENU } from '../helpers/constants/menu.constants';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  panelMenu: MenuItem[] = [];
  display: boolean = false
  sidebarVisible: boolean = false;
  showPanelMenu : boolean = true;  

  constructor(
    private _router: Router,
    private confirmationService: ConfirmationService,
    private readonly authService: OAuthService
  ) { }

  ngOnInit() {
    this.setItemsPanelMenu();
    this.verifyMenuActive();
  }

  verifyMenuActive() {
    let isIncludedInMenu = false
    MENU.forEach(menu => {
        menu.items.forEach(submenu => {
            if(this._router.url === submenu.path) {
            isIncludedInMenu = true
              this.navigateTo(menu.label, submenu.label, null )
            }
        })
    })
    if (isIncludedInMenu === false) {
      this.navigateTo(null, null, null)
    }
}

   // Metodo para construir el objeto menu que necesite primeNG
  setItemsPanelMenu() {
    this.panelMenu = MENU.map(menu => {
        return {
            label: menu.label,
            expanded: false,
            items: menu.items.map(item => {
            return {
                label: item.label,
                command: () => {
                    this.navigateTo(menu.label, item.label,item.path)
                },
            }
            })
        }
    })
  }

  navigateTo(menuLabel: any, submenuLabel: any, url: any) {
    this.panelMenu.forEach(menu => {
        menu.id = undefined;
        menu.expanded = false;

        if (menu.label === menuLabel) {
            menu.id = 'menu-active';
            menu.expanded = true;
        }

        if (menu.items) {
            menu.items.forEach(submenu => {
                submenu.id = undefined;

                if (submenu.label === submenuLabel) {
                    submenu.id = 'submenu-active';
                }
            });
        }
    });

    if (url) {
        this._router.navigate([url]);
    }

    this.sidebarVisible = false
    this.showPanelMenu = false;

    setTimeout(() => {
        this.showPanelMenu = false;
    });
  }

  logOut(){
    this.sidebarVisible = false
    this.confirmationService.confirm({
      message: `¿Desea cerrar la sesión?`,
      accept: async () => {
        this.authService.logOut();
      },
    })
  }
}
