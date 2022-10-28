import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SearchSpinnerComponent } from './search-spinner/search-spinner.component';

@NgModule({
  declarations: [LoadingSpinnerComponent, SearchSpinnerComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    LoadingSpinnerComponent,
    SearchSpinnerComponent,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
