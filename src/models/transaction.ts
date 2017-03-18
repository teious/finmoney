import{ Moment } from 'moment';
export class Transaction{
    _id:string;
    name:string;
    value:number;
    checked:boolean;
    date:Date;

    constructor(name, value, date){
        this.name = name;
        this.value = value;
        this.date = date;
        this.checked =false
    }
}