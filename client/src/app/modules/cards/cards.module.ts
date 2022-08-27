import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './pages/cards/cards.component';
import { CollectionsComponent } from './pages/collections/collections.component';
import { MainComponent } from './pages/main/main.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollectionsBlockComponent } from './components/collections-block/collections-block.component';
import { CollectionsSkeletonComponent } from './components/collections-skeleton/collections-skeleton.component';



@NgModule({
  declarations: [
    CardsComponent,
    CollectionsComponent,
    CardsComponent,
    MainComponent,
    CollectionsBlockComponent,
    CollectionsSkeletonComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    // BrowserAnimationsModule,
  ]
})
export class CardsModule { }
