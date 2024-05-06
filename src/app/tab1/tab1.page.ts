import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnecteddevicesService  } from '../services/connecteddevices.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public connecteddevicesService: ConnecteddevicesService, private router: Router) {}

  inspectDevice(id: string) {
    this.router.navigate(['/tabs/tab3/connected', id]);
  }
}
