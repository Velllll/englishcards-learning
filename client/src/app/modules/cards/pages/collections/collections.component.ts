import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, take, switchMap } from 'rxjs';
import { IAllCollections } from '../../interfaces/collection.interface';
import { Router } from '@angular/router';
import { CollectionService } from '../../services/collection.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {

  collections$!: Observable<IAllCollections>

  collectionName: string = ''

  addCollectionModalState: boolean = false

  refreshCollections$ = new BehaviorSubject(true)

  constructor(
    private collectionService: CollectionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.collections$ = this.refreshCollections$.pipe(switchMap(() => this.collectionService.getCollections())) 
  }

  openCollection(id: number) {
    this.router.navigate(['/learn/collections/' + id])
  }

  addCollectionModal() {
    this.addCollectionModalState = !this.addCollectionModalState
  }

  createCollection() {
    this.collectionService.createCollection(this.collectionName)
    .pipe(take(1))
    .subscribe(console.log)
    this.collectionName = ''
    this.addCollectionModal()
    this.refreshCollections$.next(true)
  }

}
