
export class Transaction{
    _id:string;
    name:string;
    value: number;
    checked:boolean;
    date:Date;

    constructor(obj:TransactionObj){
        this.name = obj.name;
        this.value = Number(obj.value);
        this.date = new Date(obj.date);
        this.checked =false
    }
}
export class TransactionObj{

name:string;
value:number;
date:string;

}