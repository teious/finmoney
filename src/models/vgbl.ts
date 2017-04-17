import {Contribution} from './contribution';
export class VGBL{
    rentability:number;
    years:number;
    total:number;
    constructor( private a:Contribution){
        this.rentability = 6;
        this.years = a.years;
        this.total = a.value * Math.pow(1+this.rentability/100, this.years); 

    }
}