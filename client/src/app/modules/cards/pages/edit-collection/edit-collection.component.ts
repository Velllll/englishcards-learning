import { ICard } from './../../interfaces/cards.interface';
import { ICollection } from './../../interfaces/collection.interface';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest, switchMap, tap, BehaviorSubject, take} from 'rxjs';
import { CollectionService } from '../../services/collection.service';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss']
})
export class EditCollectionComponent implements OnInit {

  collectionID$ = this.activatedRoute.params
  collectionInfo$!: BehaviorSubject<[ICollection, ICard[]]>

  modalNameEditState = false
  modalCardEditState = false

  newName: string = ''

  constructor(
    private collectionService: CollectionService,
    private cardsService: CardsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const collection = this.collectionID$.pipe(
      switchMap(params => {
        return this.collectionService.getCollection(params['collectionID'])
      })
    )
    const cards = this.collectionID$.pipe(
      switchMap(params => {
        return this.cardsService.getCardsFromCollection(params['collectionID'])
      })
    )
    combineLatest(collection, cards)
      .pipe(take(1))
      .subscribe(data => this.collectionInfo$ = new BehaviorSubject(data))
  }

  modalNameEdit() {
    this.modalNameEditState = !this.modalNameEditState
  }

  modalCardEditOpen() {
    this.modalCardEditState = true
  }

  modalCardEditClose() {
    this.modalCardEditState = false
  }

  changeName() {
    this.collectionID$.pipe(
      switchMap(params => {
        const collectionID = params['collectionID']
        return this.collectionService.updateCollectionName(collectionID, this.newName)
      }),
      tap(() => {
        const newData = this.collectionInfo$.getValue()
        newData[0].name = this.newName
        this.collectionInfo$.next(newData)
        this.newName = ''
        this.modalNameEdit()
      })
    )
    .subscribe()
  }

}
