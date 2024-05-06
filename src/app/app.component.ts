import { Component } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    //initialize bluetooth
    BleClient.initialize().then();
  }
}
