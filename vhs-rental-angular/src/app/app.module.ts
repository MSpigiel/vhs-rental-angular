import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent }  from './components/app.component';
import { AppComponentRented }  from './components/app.componentRented';
import { AppComponentMovies }  from './components/app.componentMovies';
import { MyFilterPipe }  from './FilterPipe';
import { ReturnVhsComponent }  from './components/modals/returnVhsModal.component';
import { AddVhsComponent }  from './components/modals/addVhsModal.component';
import { EditVhsComponent }  from './components/modals/editVhsModal.component';
import { DetailsVhsComponent }  from './components/modals/detailsVhsModal.component';

const appRoutes: Routes = [
  { path: 'moviesList',               component: AppComponentMovies },
  { path: 'rentedMovies',              component: AppComponentRented},
  { path: 'main',                     component: AppComponent },

  { path: '',
    redirectTo: '/moviesList',
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
  declarations: [ AppComponent, AppComponentMovies, MyFilterPipe, AppComponentRented,
    ReturnVhsComponent, AddVhsComponent, EditVhsComponent, DetailsVhsComponent ],
  bootstrap:    [ AppComponent ],
})
export class AppModule { }
