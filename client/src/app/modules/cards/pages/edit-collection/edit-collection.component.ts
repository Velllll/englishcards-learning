import { ICard } from './../../interfaces/cards.interface';
import { ICollection } from './../../interfaces/collection.interface';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { CollectionService } from '../../services/collection.service';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss']
})
export class EditCollectionComponent implements OnInit {

  collectionID = +this.router.url.split("/")[3]
  collectionInfo$!: Observable<[ICollection, ICard[]]> 

  modalNameEditState = false
  modalCardEditState = false

  constructor(
    private collectionService: CollectionService,
    private cardsService: CardsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const collection = this.collectionService.getCollection(this.collectionID)
    const cards = this.cardsService.getCardsFromCollection(this.collectionID)
    this.collectionInfo$ = forkJoin(collection, cards)
    this.collectionInfo$.subscribe(console.log)
  }

  modalNameEdit() {
    this.modalNameEditState = !this.modalNameEditState
  }

  modalCardEditOpen(cardID: number) {
    console.log(cardID)
    this.modalCardEditState = true
  }

  modalCardEditClose() {
    this.modalCardEditState = false
  }
}
