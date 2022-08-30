import { HttpClient } from '@angular/common/http';
import { IAllCollections, ICollection } from './../interfaces/collection.interface';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class CollectionService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCollections(): Observable<IAllCollections> {
    return this.http.get<IAllCollections>('http://localhost:5000/api/get-collections', {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }

  getCollection(collectionID: number) {
    return this.http.get<ICollection>('http://localhost:5000/api/get-collection/' + collectionID, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }
}
// function: get collection
// type: get
// link: /get-collection/:collectionID

// function: update-collection
// type: update
// link: /api/update-collection
// params: name, collectionID