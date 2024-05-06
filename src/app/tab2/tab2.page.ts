import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScanneddevicesService } from '../services/scanneddevices.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public scannedDevicesService: ScanneddevicesService, private router: Router) {}

  inspectDevice(id: string) {
    this.router.navigate(['/tabs/tab3/scanned', id]);
  }
  toggleScanning() {
    this.scannedDevicesService.toggleScan();
  }
}
