import { CollectionService } from './../../services/collection.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { map, Observable, switchMap, take, BehaviorSubject, tap } from 'rxjs';
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

  cards$!: Observable<ICard[]>
  refreshCards$ = new BehaviorSubject('get')
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
    this.cards$ = this.collectionID$.pipe(
      switchMap(params => {
        return this.refreshCards$.pipe(switchMap((data: any) => {
            if(data === 'shuffle') {
              return this.cardsService.getCardsFromCollection(params['collectionID']).pipe(
                map(i => i.sort(() => Math.random() - 0.5))
              )
            } else {
              return this.cardsService.getCardsFromCollection(params['collectionID'])
            }
          }))
      })
    )

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
        return this.cardsService.createCard(
          params['collectionID'],
          this.newCardForm.value.front,
          this.newCardForm.value.back
        )
      }),
      tap(() => {
        this.refreshCards$.next('get')
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

  flipCards() {
    this.side = this.side === 'front' ? 'back' : 'front'
  }

  shuffleCards() {
    this.disabledShuffle = true
    this.refreshCards$.next('shuffle')
    setTimeout(() => this.disabledShuffle = false, 5000)
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
