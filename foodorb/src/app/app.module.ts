import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterComponent } from './components/register/register.component';
import { MustMatchDirective } from './directives/must-match.directive';
import { IncludesComponent } from './pages/includes/includes.component';
import { IncludesMainComponent } from './pages/includes-main/includes-main.component';
import { CartComponent } from './pages/cart/cart.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { TrackOrderComponent } from './pages/track-order/track-order.component';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { SearchItemComponent } from './pages/search-item/search-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginFormComponent,
    HomePageComponent,
    NotFoundComponent,
    ProfilePageComponent,
    RegisterComponent,
    MustMatchDirective,
    IncludesComponent,
    IncludesMainComponent,
    CartComponent,
    SettingsComponent,
    TrackOrderComponent,
    ForgotComponent,
    SearchItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
