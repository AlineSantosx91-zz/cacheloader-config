import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';

const APP_ROUTES: Routes = [
    { path: 'menu', component: MenuComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);