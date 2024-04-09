import { Component, ElementRef, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { style } from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  title: string  = '';
  description: string   = '';
  customPropertie = null;

  alertSound = new Audio('assets/mp3/tab.mp3')

  constructor(
    private _dialogRef: DynamicDialogRef,
    private _config: DynamicDialogConfig,
    private ref: ElementRef
  ) { }

  ngOnInit() {
    this.title = this._config.data.title;
    this.description = this._config.data.description;
    this.customPropertie = this._config.data.customPropertie;
    this.ref.nativeElement.closest('.p-component-overlay-enter').classList.add('alert-modal')
    this.alertSound.play();

    const title = document.querySelector('.p-dialog-title');
    if (title) {
      title.innerHTML = '¡Aviso!';
    }
  }

  closeModal() {
    this._dialogRef.close()
  }

}
