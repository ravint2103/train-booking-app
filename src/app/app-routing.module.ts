import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/pages/login/login.component';
import { ReservationComponent } from '../app/pages/reservation/reservation.component';
import { TrainListComponent } from '../app/pages/train-list/train-list.component';
import { MyAccountComponent } from '../app/pages/my-account/my-account.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'train-list', component: TrainListComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: '', redirectTo: '/reservation', pathMatch: 'full' },
  { path: '**', component: ReservationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
