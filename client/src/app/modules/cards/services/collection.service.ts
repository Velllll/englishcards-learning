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

  createCollection(collectionName: string) {
    return this.http.post('http://localhost:5000/api/create-collection', {name: collectionName}, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }

  startLearn(collectionID: number) {
    return this.http.post('http://localhost:5000/api/start-learn', {collectionID}, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }

  updateCollectionName(collectionID: number, newName: string) {
    return this.http.put('http://localhost:5000/api/update-collection', {collectionID, name: newName}, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }

  deleteCollection(collectionID: number) {
    return this.http.delete('http://localhost:5000/api/delete-collection/' + collectionID, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  } 
}