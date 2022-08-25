export interface ICollection {
    collectionID: number;
    name: string;
    createDate: number;
    repeatDates: number[];
    amount: number;
}

export interface IAllCollections {
    today: ICollection[];
    late: ICollection[];
    notStarted: ICollection[];
}