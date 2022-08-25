import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './pages/cards/cards.component';
import { CollectionsComponent } from './pages/collections/collections.component';

const routes: Routes = [
  {path: '', redirectTo: 'collection', pathMatch: 'full'},
  {path: 'collection', component: CollectionsComponent},
  {path: 'collection/:collectionName', component: CardsComponent},
  {path: '**', redirectTo: 'collection', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
