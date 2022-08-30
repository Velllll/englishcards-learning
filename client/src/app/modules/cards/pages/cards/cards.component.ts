import { FormGroup, FormControl, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, switchMap, take } from 'rxjs';
import { ICard } from '../../interfaces/cards.interface';
import { CardsService } from '../../services/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  animations: [
    trigger('modal', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(100, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate(100, style({ opacity: 0 }))
      ]),
    ])
  ]
})
export class CardsComponent implements OnInit {

  collectionID: number = +this.router.url.split('/')[3]

  modalState = false
  modalAnimationState: string = ''

  cards: ICard[] = []
  newCardForm!: FormGroup

  side = 'front'

  constructor(
    private cardsService: CardsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cardsService.getCardsFromCollection(this.collectionID)
    .pipe(take(1))
    .subscribe(cards => cards.forEach(card => this.cards.push(card)))
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
    .subscribe({
      next: (response: any) => {
        const newCard = {
          cardID: response.cardID,
          collectionID: this.collectionID,
          frontSide: this.newCardForm.value.front,
          backSide: this.newCardForm.value.back,
        }
        this.cards.push(newCard)
        this.newCardForm.setValue({
          front: '',
          back: ''
        })
      }
    })
    this.modalStateControll()
  }

  flipCards() {
    this.side = this.side === 'front' ? 'back' : 'front'
  }

  shuffleCards() {
    this.cards.sort(() => Math.random() - 0.5);
  }

}
