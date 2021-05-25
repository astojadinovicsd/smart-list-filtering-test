import { NgModule } from '@angular/core';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';

@NgModule({
  declarations: [
    LoaderComponent,
    ConfirmationModalComponent
  ],
  imports: [],
  exports: [
    LoaderComponent,
    ConfirmationModalComponent
  ],
})

export class SharedModule {}
