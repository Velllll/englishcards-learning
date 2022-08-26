import { CollectionService } from './../../services/collection.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAllCollections } from '../../interfaces/collection.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  collections$!: Observable<IAllCollections>

  constructor(
    private collectionService: CollectionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.collections$ = this.collectionService.getCollections()
  }

  getDate(date: (number | string)[]): any {
    const today = +(new Date().toISOString().split('T')[0].split('-').join(''))
    const datesNumber = date.map(date => +(new Date(date).toISOString().split('T')[0].split('-').join('')))
    const closeDate = datesNumber.filter(date => date > today)[0]
    const closeDateString = `${closeDate}`.slice(6) + '-' + `${closeDate}`.slice(4, 6) + '-' + `${closeDate}`.slice(0, 4)
    return closeDateString
  }

  openCollection(id: number) {
    this.router.navigate(['/learn/collections/' + id])
  }

}
