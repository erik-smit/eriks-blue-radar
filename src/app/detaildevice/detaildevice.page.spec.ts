import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { BleClient } from '@capacitor-community/bluetooth-le';

import { DetailDevicePage } from './detaildevice.page';
import { ScanneddevicesService } from '../services/scanneddevices.service';

// Create a spy object for the BleClient
const bleClientSpy = jasmine.createSpyObj('BleClient', ['initialize', 'startScan', 'stopScan']);

describe('DetailDevicePage Methods', () => {
  let component: DetailDevicePage;
  let fixture: ComponentFixture<DetailDevicePage>;
  let scannedDevicesService: ScanneddevicesService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailDevicePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        { provide: BleClient, useValue: bleClientSpy },
        // other providers...
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailDevicePage);
    component = fixture.componentInstance;
    scannedDevicesService = TestBed.inject(ScanneddevicesService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should stop scanning on destroy', () => {
    spyOn(scannedDevicesService, 'stopScan');
    component.ngOnDestroy();
    expect(scannedDevicesService.stopScan).toHaveBeenCalled();
  });

  it('should clear inspected devices', () => {
    const deviceId = 'testDeviceId';
    component.inspectConnectedDevice(deviceId);
    expect(component.inspectedDevices.length).toBe(1);
    expect(component.inspectedDevices[0].id).toBe(deviceId);
    component.clearInspectedDevices();
    expect(component.inspectedDevices.length).toBe(0);
  });

  it('should inspect connected device', () => {
    const deviceId = 'testDeviceId';
    component.inspectConnectedDevice(deviceId);
    expect(component.inspectedDevices.length).toBe(1);
    expect(component.inspectedDevices[0].id).toBe(deviceId);
  });

  it('should inspect scanned device', () => {
    const deviceId = 'testDeviceId';
    spyOn(scannedDevicesService, 'startScan');
    component.inspectScannedDevice(deviceId);
    expect(component.inspectedDevices.length).toBe(1);
    expect(component.inspectedDevices[0].id).toBe(deviceId);
    expect(scannedDevicesService.startScan).toHaveBeenCalled();
  });

  it('should add RSSI datum', () => {
    const rssi = -60;
    component.addRssiDatum(rssi);
    expect(component.data.length).toBe(1);
    expect(component.data[0][1]).toBe(rssi);
  });
});