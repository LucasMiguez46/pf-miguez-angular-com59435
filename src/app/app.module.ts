import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { UsersService } from './core/services/users.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule
  ],
  providers: [
    provideAnimationsAsync(),
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
