import { HttpClient } from '@angular/common/http';
import { IAllCollections } from './../interfaces/collection.interface';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
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

}
