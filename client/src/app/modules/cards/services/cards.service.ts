import { ICard } from './../interfaces/cards.interface';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class CardsService {
  url: string = "http://localhost:5000/"
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCardsFromCollection(collectionID: number): Observable<ICard[]> {
    return this.http.get<ICard[]>(this.url + 'api/get-cards/' + collectionID, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }

  createCard(collectionID: number, frontSide: string, backSide: string) {
    const data = {
      collectionID,
      frontSide,
      backSide
    }
    return this.http.post(this.url + 'api/create-card', data, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }

  getAllCards() {
    return this.http.get(this.url + 'api/get-all-cards', {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }

  getCard(cardID: number): Observable<ICard> {
    return this.http.get<ICard>(this.url + 'api/get-card/' + cardID, {
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
    return this.http.put<ICard>(this.url + 'api/update-card', cardInfo, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }

  deleteCard(cardID: number) {
    return this.http.delete<ICard>(this.url + 'api/delete-card/' + cardID, {
      headers: {"Authorization": "Bearer " + this.authService.getToken()}
    })
  }
}