import { ICard } from './../interfaces/cards.interface';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class CardsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCardsFromCollection(collectionID: number): Observable<ICard[]> {
    return this.http.get<ICard[]>('http://localhost:5000/api/get-cards/' + collectionID, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }

  createCard(collectionID: number, frontSide: string, backSide: string) {
    const data = {
      collectionID,
      frontSide,
      backSide
    }
    return this.http.post('http://localhost:5000/api/create-card', data, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }

  getAllCards() {
    return this.http.get('http://localhost:5000/api/get-all-cards', {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }

  getCard(cardID: number): Observable<ICard> {
    return this.http.get<ICard>('http://localhost:5000/api/get-card/' + cardID, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }

  updateCard(cardID: number, collectionID: number, frontSide: string, backSide: string) {
    const cardInfo = {
      cardID,
      collectionID,
      frontSide,
      backSide
    }
    return this.http.put<ICard>('http://localhost:5000/api/update-card', cardInfo, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }
}