import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './pages/cards/cards.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent, children: [
    {path: 'collections', component: CollectionsComponent},
    {path: 'collections/:collectionName', component: CardsComponent},
    {path: '**', redirectTo: 'collection', pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
