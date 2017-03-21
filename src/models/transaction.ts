
export class Transaction{
    _id:String;
    name:string;
    value: number;
    checked:boolean;
   

    constructor(obj:TransactionObj){
        this.name = obj.name;
        this.value = Number(obj.value);
        this._id = new Date(obj.date).toISOString();
        this.checked =false
    }
}
export class TransactionObj{

name:string;
value:number;
date:string;

}