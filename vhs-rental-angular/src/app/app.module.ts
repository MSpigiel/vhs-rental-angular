import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent }  from './components/app.component';
import { AppComponentRented }  from './components/app.componentRented';
import { AppComponentMovies, MyFilterPipe }  from './components/app.componentMovies';
import { AppComponentWelcome }  from './components/app.componentWelcome';
import { ReturnVhsComponent }  from './components/modals/returnVhsModal.component';

const appRoutes: Routes = [
  { path: 'moviesList',               component: AppComponentMovies },
  { path: 'rentedMovies',              component: AppComponentRented},
  { path: 'welcomePage',              component: AppComponentWelcome },
  { path: 'main',                     component: AppComponent },

  { path: '',
    redirectTo: '/welcomePage',
    pathMatch: 'full'
  },
  { path: '**', component: AppComponent },
];

@NgModule({
  imports:      [ BrowserModule,
   RouterModule.forRoot(appRoutes),
   FormsModule,
    HttpModule,
    JsonpModule,
    ],
  declarations: [ AppComponent, AppComponentMovies, MyFilterPipe, AppComponentRented, AppComponentWelcome, ReturnVhsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
