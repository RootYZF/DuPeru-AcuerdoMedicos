import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AlertComponent } from '../../services/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private _dialogService: DialogService,
  ) { }

  open(message: string): void {
    this._dialogService.open(AlertComponent, {
      data: {
        description: message,
      },
      width: '32rem'
    })
  }

}
