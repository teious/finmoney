import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { ReceitaForm} from '../pages/page1/receita-form';
import { DespesaForm} from '../pages/page1/despesa-form';
import {TransactionService} from '../providers/transaction';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    ReceitaForm,
    DespesaForm
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    ReceitaForm,
    DespesaForm
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, TransactionService]
})
export class AppModule {}
