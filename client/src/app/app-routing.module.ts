import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'learn', pathMatch: 'full'},
  {
    path: 'learn', 
    loadChildren: () => import('./modules/cards/cards.module').then(m => m.CardsModule)
  },
  {path: '**', redirectTo: 'learn', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
