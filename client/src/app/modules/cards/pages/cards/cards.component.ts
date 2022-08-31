import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, switchMap, take, BehaviorSubject } from 'rxjs';
import { ICard } from '../../interfaces/cards.interface';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],

})
export class CardsComponent implements OnInit {

  collectionID: number = +this.router.url.split('/')[3]

  modalState = false

  cards$!: Observable<ICard[]>
  refreshCards$ = new BehaviorSubject(true)

  newCardForm!: FormGroup

  side = 'front'

  constructor(
    private cardsService: CardsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cards$ = this.refreshCards$.pipe(switchMap(() => this.cardsService.getCardsFromCollection(this.collectionID))) 

    this.newCardForm = new FormGroup({
      "front": new FormControl('', [Validators.required]),
      "back": new FormControl('', [Validators.required])
    })
  }

  modalStateControll() {
    this.modalState = !this.modalState
  }

  addCard() {
    this.cardsService.createCard(this.collectionID, this.newCardForm.value.front, this.newCardForm.value.back)
    .pipe(take(1))
    .subscribe()
    this.refreshCards$.next(true)
    this.modalStateControll()
    this.newCardForm.setValue({
      front: '',
      back: ''
    })
  }

  flipCards() {
    this.side = this.side === 'front' ? 'back' : 'front'
  }

  shuffleCards() {
    // this.cards.sort(() => Math.random() - 0.5);
  }

}
