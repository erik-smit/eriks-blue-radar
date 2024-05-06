import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BleClient } from '@capacitor-community/bluetooth-le';

import { EChartsOption, ECharts } from 'echarts';

import { ScanneddevicesService } from '../services/scanneddevices.service';
import { ScanResult } from '@capacitor-community/bluetooth-le';
import { scan } from 'rxjs';

export interface inspecteddevice {
  name: string;
  id: string;
  rssi: number;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  // FIXME: maybe use undefined instead of empty array
  public inspectedDevices: inspecteddevice[] = [];

  constructor(private route: ActivatedRoute, public scannedDevicesService: ScanneddevicesService) {
    this.route.params.subscribe(params => {
      if (params['connected']) {
        this.inspectConnectedDevice(params['connected']);
      }
      if (params['scanned']) {
        this.inspectScannedDevice(params['scanned']);
      }
    });
  }

  private inspectConnectedDevice(deviceId: string) {
    this.inspectedDevices.push({
      name: deviceId,
      id: deviceId,
      rssi: -60
    });
    // poll Rssi once a second
    setInterval(() => {
      BleClient.readRssi(deviceId)
        .then((rssi) => {
          this.inspectedDevices[0] = {
            ...this.inspectedDevices[0],
            rssi: rssi
          }
          this.addRssiDatum(rssi);
        })
        .catch(err => {
          // if readRssi fails, try to connect()
          setTimeout(async () => {
            await BleClient.connect(deviceId);
          }, 0);
        });
    }, 1000);
  }

  private inspectScannedDevice(deviceId: string) {
    this.inspectedDevices.push({
      name: deviceId,
      id: deviceId,
      rssi: -60
    });

    console.log("inspecting device " + deviceId);
    let callback = (scanresult: ScanResult) => {
      if (scanresult.device.deviceId !== deviceId) {
        return;
      }
      if (scanresult.rssi !== undefined) {
        this.inspectedDevices[0] = {
          ...this.inspectedDevices[0],
          rssi: scanresult.rssi
        }
        this.addRssiDatum(scanresult.rssi);
        console.log("found device " + deviceId + " with rssi " + scanresult.rssi);
      }
    }
    this.scannedDevicesService.startScan(callback);
  }

  // ECharts stuff

  echartsInstance: ECharts | undefined;
  onChartInit(chart: ECharts) {
    this.echartsInstance = chart;
  }

  chartOption: EChartsOption = {
    xAxis: [
      {
        type: 'time',
        axisLabel: {
          // returns date in form of hh:mm:ss
          formatter: (value: number) => {
            const date = new Date(value);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            return `${minutes}:${seconds}`;
          }
        }
      }
    ],
    yAxis: [{
      type: 'value',
      max: (value) => value.min + 20,
      min: (value) => value.min - 20,
    }],
    series: [
      {
        type: 'line',
        smooth: true,
      },
    ]
  };
  mergeOption: any;
  data: any[] = [];

  addRssiDatum(rssi: number) {
    this.data.push([new Date(), rssi])
    while (this.data.length > 20) {
      this.data.shift();
    }
    this.mergeOption = { series: [{ data: this.data }] };
  }
}
