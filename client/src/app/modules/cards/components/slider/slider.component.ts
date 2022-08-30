import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICard } from '../../interfaces/cards.interface';

@Component({
  selector: 'app-slider [cards] [side]',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('card', [
      state('front', style({})),
      state('back', style({})),
      transition('front <=> back', [
        style({opacity: 0.2}),
        animate(100, style({opacity: 1}))
      ])
    ]),
  ]
})
export class SliderComponent implements OnInit, OnChanges {

  @Input() cards!: ICard[]
  @Input() side!: string
  position = 0

  cardSide!: string

  animationState = 'front'
  
  constructor() { }

  ngOnInit(): void { 
    this.cardSide = this.side
  }

  ngOnChanges(changes: SimpleChanges): void {
    const side = changes['side'].currentValue
    this.cardSide = side
  }

  next() {
    if(this.position < this.cards.length) {
      this.position += 1
    }
    if(this.position === this.cards.length) {
      this.position = 0
    }
    this.flipBack()
  }

  prev() {
    if(this.position === 0) {
      this.position = this.cards.length - 1
    } else {
      this.position = this.position - 1
    }
    this.flipBack()
  }

  flipBack() {
    if(this.cardSide !== this.side) {
      this.cardSide = this.side
    }
  }

  flipCard() {
    this.cardSide = this.cardSide === 'front' ? 'back' : 'front'
    this.animationState = this.cardSide
  }

}
