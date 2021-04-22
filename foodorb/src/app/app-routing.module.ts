import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterComponent } from './components/register/register.component'
import { CartComponent } from './pages/cart/cart.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { TrackOrderComponent } from './pages/track-order/track-order.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { SearchItemComponent } from './pages/search-item/search-item.component';


const routes: Routes = [
  {  path: "",  redirectTo: 'login',  pathMatch: 'full'},
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomePageComponent, canActivate: [AuthGuard]  },
  { path: "login", component: LoginPageComponent },
  { path: "profile", component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: "cart", component: CartComponent, canActivate: [AuthGuard] },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard] },
  { path: "trackOrder", component: TrackOrderComponent, canActivate: [AuthGuard] },
  { path: "searchResults", component: SearchItemComponent, canActivate: [AuthGuard] },
  { path: "forgot", component: ForgotComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
