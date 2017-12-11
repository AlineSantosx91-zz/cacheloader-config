import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { MenuCadastroComponent } from './menu-cadastro/menu-cadastro.component';

const APP_ROUTES: Routes = [
    { path: 'menu', component: MenuComponent },
    { path: 'menu-cadastro', component: MenuCadastroComponent },
    
    {
        path: '',
        redirectTo: '/menu',
        pathMatch: 'full'
    },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);