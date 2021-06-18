import { registerPlugin } from '@capacitor/core';

export interface BluetoothManager_getConnectedDevicesPlugin {
    getConnectedDevices(): Promise<{ devices: any[]}>;
}

const BluetoothManager_getConnectedDevices = registerPlugin<BluetoothManager_getConnectedDevicesPlugin>('BluetoothManager_getConnectedDevices');

export default BluetoothManager_getConnectedDevices;