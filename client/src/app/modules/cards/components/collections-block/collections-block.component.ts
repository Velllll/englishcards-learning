import { ICollection } from './../../interfaces/collection.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collections-block [collections]',
  templateUrl: './collections-block.component.html',
  styleUrls: ['./collections-block.component.scss']
})
export class CollectionsBlockComponent implements OnInit {

  @Input() collections!: ICollection[]

  @Input() date?: string
  
  @Output() open = new EventEmitter<number>()

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openCollection(id: number) {
    this.open.emit(id)
  }

  getDate(date: (number | string)[]): string {
    const today = +(new Date().toISOString().split('T')[0].split('-').join(''))
    const datesNumber = date.map(date => +(new Date(date).toISOString().split('T')[0].split('-').join('')))
    const closeDate = datesNumber.filter(date => date > today)[0]
    const closeDateString = `${closeDate}`.slice(6) + '-' + `${closeDate}`.slice(4, 6) + '-' + `${closeDate}`.slice(0, 4)
    return closeDateString
  }

  edit(collectionID: number) {
    this.router.navigate(['/learn/edit/' + collectionID])
  }
}
