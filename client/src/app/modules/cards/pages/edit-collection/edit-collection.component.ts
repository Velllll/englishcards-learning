import { ICard, ICardForm } from './../../interfaces/cards.interface';
import { ICollection } from './../../interfaces/collection.interface';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest, switchMap, tap, BehaviorSubject, take, map, Observable} from 'rxjs';
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

  card$!: Observable<ICard>

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
      .pipe(
        take(1))
      .subscribe((data: any) => {
        console.log(data)
        if(!data[0]?.error) {
          this.collectionInfo$ = new BehaviorSubject(data)
        } else {
          this.router.navigate(['/learn/collections'])
        }
      })
  }

  modalNameEdit() {
    this.modalNameEditState = !this.modalNameEditState
  }

  modalCardEditOpen(cardID: number) {
    this.modalCardEditState = true
    this.card$ = this.cardsService.getCard(cardID)
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

  deleteCollection() {
    this.collectionID$.pipe(
      switchMap(params => {
        const collectionID = params['collectionID']
        return this.collectionService.deleteCollection(collectionID)
      }),
      tap(() => {
        this.router.navigate(['/learn/collections'])
      }),
      take(1)
    )
    .subscribe()
  }

  saveCard(cardForm: ICardForm) {
    const {frontSide, backSide, cardID} = cardForm
    this.collectionID$.pipe(
      switchMap(params => {
        const collectionID = params['collectionID']
        const collectionInfo = this.collectionInfo$.getValue()
        const cardIndex = collectionInfo[1].findIndex(card => card.cardID === cardID)
        collectionInfo[1][cardIndex] = {cardID, collectionID, frontSide, backSide}
        this.collectionInfo$.next(collectionInfo)
        return this.cardsService.updateCard(cardID, collectionID, frontSide, backSide)
      }),
      tap(() => this.modalCardEditClose()),
      take(1)
    )
    .subscribe()
  }

  deleteCard(cardID: number) {
    this.cardsService.deleteCard(cardID).pipe(take(1)).subscribe()
    const data = this.collectionInfo$.getValue()
    const newCardArray: ICard[] = data[1].filter(cards => cards.cardID !== cardID)
    const collection: ICollection = data[0]
    const newData: [ICollection, ICard[]] = [collection, newCardArray]
    this.collectionInfo$.next(newData)
    this.modalCardEditClose()
  }
}
