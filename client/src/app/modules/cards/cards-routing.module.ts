import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCardComponent } from './components/edit-card/edit-card.component';
import { CardsComponent } from './pages/cards/cards.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { EditCollectionComponent } from './pages/edit-collection/edit-collection.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [ 
  {path: '', component: MainComponent, children: [
    {path: 'collections', component: CollectionsComponent},
    {path: 'collections/:collectionID', component: CardsComponent},
    {path: 'edit/:collectionID', component: EditCollectionComponent,
      children: [
        {path: ':cardID', component: EditCardComponent}
      ]
    },
    {path: '**', redirectTo: 'collections', pathMatch: 'full'},
    {path: '', redirectTo: 'collections', pathMatch: 'full'},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
