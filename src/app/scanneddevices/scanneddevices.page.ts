import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScanneddevicesService } from '../services/scanneddevices.service';
import { DetailDevicePage } from '../detaildevice/detaildevice.page';

@Component({
  selector: 'app-scanneddevices',
  templateUrl: 'scanneddevices.page.html',
  styleUrls: ['scanneddevices.page.scss']
})
export class ScannedDevicesPage {

  constructor(public scannedDevicesService: ScanneddevicesService, private modalCtrl: ModalController) {}

  toggleScanning() {
    this.scannedDevicesService.toggleScan();
  }

  async inspectDevice(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetailDevicePage,
      componentProps: {
        'scanned': id
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

}
