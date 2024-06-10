import { Component} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConnecteddevicesService  } from '../services/connecteddevices.service';
import { DetailDevicePage } from '../detaildevice/detaildevice.page';

@Component({
  selector: 'app-connecteddevice',
  templateUrl: 'connecteddevices.page.html',
  styleUrls: ['connecteddevices.page.scss']
})
export class ConnectedDevicesPage {
  constructor(public connecteddevicesService: ConnecteddevicesService, private modalCtrl: ModalController) {}

  async inspectDevice(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetailDevicePage,
      componentProps: {
        'connected': id
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }
}
