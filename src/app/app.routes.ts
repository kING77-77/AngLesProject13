
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { candeactivateGuard } from './deactivate.guard';
import { routeGuard } from './reg-guard.guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AuthComponent } from './auth/auth.component (1)';
import { CartComponent } from './cart/cart.component';

export const appRoutes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [routeGuard], canDeactivate: [candeactivateGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [routeGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'cart', component: CartComponent, canActivate: [routeGuard] },
  { path: '**', redirectTo: '' },
  { path: 'product/:id', component: ProductDetailComponent }
];