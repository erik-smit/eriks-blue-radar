import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnecteddevicesService  } from '../services/connecteddevices.service';

@Component({
  selector: 'app-connecteddevice',
  templateUrl: 'connecteddevices.page.html',
  styleUrls: ['connecteddevices.page.scss']
})
export class ConnectedDevicesPage {

  constructor(public connecteddevicesService: ConnecteddevicesService, private router: Router) {}

  inspectDevice(id: string) {
    this.router.navigate(['/tabs/detaildevice/connected', id]);
  }
}
