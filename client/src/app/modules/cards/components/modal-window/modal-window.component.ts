import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-modal-window [close]',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss'],
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
export class ModalWindowComponent implements OnInit {

  @Output() close = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit()
  }
}
