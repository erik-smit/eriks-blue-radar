import { Injectable } from '@angular/core';
import { BleClient } from '@capacitor-community/bluetooth-le';

export interface connecteddevices {
  name: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConnecteddevicesService {
  public connectedDevices: connecteddevices[] = [];

  constructor() { 
    this.getConnectedDevices();
  }

  getConnectedDevices() {
    BleClient.getConnectedDevices([]).then((devices) => {
      this.connectedDevices = devices.map((device) => {
        return {
          name: device.name || 'Unknown',
          id: device.deviceId,
        }
      });
    });
  }
}
