import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-window [close]',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
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
