import { Injectable } from '@angular/core';
import { BleClient, RequestBleDeviceOptions, ScanResult } from '@capacitor-community/bluetooth-le';

export interface ScannedDevice {
  id: string;
  name: string;
  rssi: number | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class ScanneddevicesService {
  public scanning: boolean = false;

  // FIXME: how does the change notification work?
  // scanresults from BleClient.requestLEScan don't cause a change notification
  // but generating fake ones with setTimeout does
  public scannedDevices: ScannedDevice[] = [];
  public scannedDevicesQueue: ScannedDevice[] = [];

  public detailDevice: ScannedDevice | undefined;
  public detailDeviceId: string | undefined;

  constructor() { }

  startScan(callback = (scanresult: ScanResult) => {
    this.scannedDevicesQueue.push({
      id: scanresult.device.deviceId,
      name: scanresult.localName || scanresult.device.name || 'Unknown',
      rssi: scanresult.rssi
    })}) {
    this.scanning = true;

    

    BleClient.requestLEScan({ allowDuplicates: true}, 
      callback);
    this.updateScannedDevices();
  }

  updateScannedDevices() {
    if (!this.scanning) {
      return
    }
    let device;
    while (device = this.scannedDevicesQueue.pop()) {
      if (!device) {
        break;
      }
      this.scannedDevices.push(device);
    }
    setTimeout(this.updateScannedDevices.bind(this), 1000);
  }

  stopScan() {
    this.scanning = false;
    BleClient.stopLEScan();
  }
  
  toggleScan() {
    if (this.scanning) {
      this.stopScan();
    } else {
      this.startScan();
    }
  }
  
}
