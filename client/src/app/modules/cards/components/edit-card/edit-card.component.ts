import { ICardForm } from './../../interfaces/cards.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-card [frontSide] [backSide] [cardID]',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

  @Input('frontSide') frontSide!: string
  @Input('backSide') backSide!: string
  @Input('cardID') cardID!: number

  @Output() save = new EventEmitter<ICardForm>()
  @Output() delete = new EventEmitter<number>()
  
  cardForm!: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      'frontSide': new FormControl(this.frontSide, [Validators.required]),
      'backSide': new FormControl(this.backSide, [Validators.required]),
    })
  }

  saveCard() {
    const cardInfo = {...this.cardForm.value, cardID: this.cardID}
    this.save.emit(cardInfo)
  }

  deleteCard() {
    this.delete.emit(this.cardID)
  }
}
