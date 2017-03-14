import { InMemoryDbService } from 'angular-in-memory-web-api';
import {} from 'moment';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let transactions = [
       {title: 'salario',value: 8000.2, checked:false, date: '13/03/2017'},
        {title: 'jogos online',value: -2000, checked:false, date: '13/03/2017'},
        {title: 'motel',value: -2000, checked:false, date: '13/03/2017'},
        {title: 'baladas',value: -2000, checked:false, date: '13/03/2017'},
        {title: 'combustivel',value: -2000, checked:false, date: '13/03/2017'},
        {title: 'pasta de dente',value: -2000, checked:false, date: '13/03/2017'}
    ];
    return {transactions};
  }
}
