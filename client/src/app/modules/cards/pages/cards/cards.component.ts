import { CollectionService } from './../../services/collection.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap, take, BehaviorSubject, tap, mapTo } from 'rxjs';
import { ICard } from '../../interfaces/cards.interface';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],

})
export class CardsComponent implements OnInit {

  collectionID$ = this.activatedRoute.params

  modalState = false
  disabledShuffle = false

  cards$!: BehaviorSubject<ICard[]>
  collectionStart$!: Observable<boolean>
  newCardForm!: FormGroup

  side = 'front'

  constructor(
    private cardsService: CardsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private collectionService: CollectionService
  ) { }

  ngOnInit(): void {
    this.collectionID$
      .pipe(
        switchMap(params => this.cardsService.getCardsFromCollection(params['collectionID'])),
        take(1),
      )
      .subscribe(data => {
        this.cards$ = new BehaviorSubject(data)
      })


    this.collectionStart$ = this.collectionID$.pipe(
      switchMap(params => {
        return this.collectionService.getCollection(params['collectionID']).pipe(map(i => i.repeatDates))
      }),
      map(i => i[0] === 'n')
    )

    this.newCardForm = new FormGroup({
      "front": new FormControl('', [Validators.required]),
      "back": new FormControl('', [Validators.required])
    })
  }

  modalStateControll() {
    this.modalState = !this.modalState
  }

  addCard() {
    this.collectionID$.pipe(
      switchMap(params => {
        const collectionID = params['collectionID']
        return this.cardsService.createCard(
          collectionID,
          this.newCardForm.value.front,
          this.newCardForm.value.back
        )
        .pipe(
          map(i => {
            return {...i, collectionID}
          })
        )
      }),
      tap((data: any) => {
        const cards: ICard[] = this.getCardsWithNewCard(
          this.newCardForm.value.back,
          this.newCardForm.value.front,
          data.cardID,
          data.collectionID,
        )
        this.cards$.next(cards)
        this.modalStateControll()
        this.newCardForm.setValue({
          front: '',
          back: ''
        })
      }),
      take(1)
    )
    .subscribe()
  }

  getCardsWithNewCard(backSide: string, frontSide: string, cardID: number, collectionID: number) {
    const newCard: ICard = {
      backSide,
      frontSide,
      cardID,
      collectionID,
    }
    const cards = [...this.cards$.getValue(), newCard]
    return cards
  }

  flipCards() {
    this.side = this.side === 'front' ? 'back' : 'front'
  }

  shuffleCards() {
    const cards = [...this.cards$.getValue()]
    cards.sort(() => Math.random() - 0.5)
    this.cards$.next(cards)
  }

  startLearn() {
    this.collectionID$.pipe(
      switchMap(params => {
        return this.collectionService.startLearn(params['collectionID'])
      }),
      tap(() => {
        this.router.navigate(['/learn/collections'])
      }),
      take(1)
    )
    .subscribe()
  }

}
