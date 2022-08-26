export interface ICollection {
    collectionID: number;
    name: string;
    createDate: number;
    repeatDates: (number | string)[];
}

export interface IAllCollections {
    today: ICollection[];
    late: ICollection[];
    notStarted: ICollection[];
}