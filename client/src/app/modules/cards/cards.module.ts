import { CardsComponent } from './pages/cards/cards.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CollectionsComponent } from './pages/collections/collections.component';
import { MainComponent } from './pages/main/main.component';
import { CollectionsBlockComponent } from './components/collections-block/collections-block.component';
import { CollectionsSkeletonComponent } from './components/collections-skeleton/collections-skeleton.component';
import { CollectionService } from './services/collection.service';
import { CardsService } from './services/cards.service';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { SliderComponent } from './components/slider/slider.component';


@NgModule({
  declarations: [
    CollectionsComponent,
    MainComponent,
    CollectionsBlockComponent,
    CollectionsSkeletonComponent,
    ModalWindowComponent,
    SliderComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    CollectionService,
    CardsService,
  ]
})
export class CardsModule { }
