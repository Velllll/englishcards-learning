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

  openCollection(id: number) {
    this.router.navigate(['/learn/collections/' + id])
  }

}
