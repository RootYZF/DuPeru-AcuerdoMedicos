import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from './primeng/primeng.module';

@NgModule({
  imports: [
    CommonModule,
    PrimeNGModule
  ],
  exports: [
    PrimeNGModule,
  ],
  declarations: []
})
export class SharedModule { }
