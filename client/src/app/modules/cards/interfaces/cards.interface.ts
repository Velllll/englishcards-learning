export interface ICard {
    cardID: number,
    collectionID: number,
    frontSide: string;
    backSide: string;
}

export interface ICardForm {
    frontSide: string,
    backSide: string,
    cardID: number
}