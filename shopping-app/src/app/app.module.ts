import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductComponent } from './product/product.component';
import {Route, Router, RouterModule, Routes, ROUTES} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ArchieveComponent } from './archieve/archieve.component';
import { ArchiveFilterPipe } from './service/archive-filter.pipe';
import { LoginComponent } from './login/login.component';
import {InceptorService} from './service/inceptor.service';
import {AuthGuardService} from './service/auth-guard.service';
import { LogoutComponent } from './logout/logout.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: ShoppingListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'archieve',
    component: ArchieveComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
  ];

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ProductComponent,
    HeaderComponent,
    ArchieveComponent,
    ArchiveFilterPipe,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
