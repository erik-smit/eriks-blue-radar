import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScanneddevicesService } from '../services/scanneddevices.service';

@Component({
  selector: 'app-scanneddevices',
  templateUrl: 'scanneddevices.page.html',
  styleUrls: ['scanneddevices.page.scss']
})
export class ScannedDevicesPage {

  constructor(public scannedDevicesService: ScanneddevicesService, private router: Router) {}

  inspectDevice(id: string) {
    this.router.navigate(['/tabs/detaildevice/scanned', id]);
  }
  toggleScanning() {
    this.scannedDevicesService.toggleScan();
  }
}
