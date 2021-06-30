import type { BleDevice } from '@capacitor-community/bluetooth-le';
import { createContext, useState } from 'react';

import BluetoothManager_getConnectedDevices from '../plugins/BluetoothManager_getConnectedDevices';

interface IMyConnectedDevice {
  device: BleDevice;
  lastseen: number;
 }

const initialConnectedDeviceState: IMyConnectedDevice[] = []

const ConnectedDevicesContext = createContext<{
    myConnectedDevices: IMyConnectedDevice[];
    setMyConnectedDevices: React.Dispatch<React.SetStateAction<IMyConnectedDevice[]>>;
  }>({
    myConnectedDevices: initialConnectedDeviceState,
    setMyConnectedDevices: () => undefined,
  });

const ConnectedDeviceScanningStart = async (setMyConnectedDevices: React.Dispatch<React.SetStateAction<IMyConnectedDevice[]>>): Promise<void> => {
  const ret = await BluetoothManager_getConnectedDevices.getConnectedDevices();
  const newMyConnectedDevices = ret.devices.map((device) => {
    return {
      device: device,
      lastseen: Date.now()
    }
  })
  setMyConnectedDevices(newMyConnectedDevices)
}

const ConnectedDeviceScanningStop = async (setMyConnectedDevices: React.Dispatch<React.SetStateAction<IMyConnectedDevice[]>>): Promise<void> => {
  setMyConnectedDevices([]);  
}

const ConnectedDeviceContextProvider: React.FC = ({children}) => {
  const [ myConnectedDevices, setMyConnectedDevices ] = useState(initialConnectedDeviceState)

  return (
    <ConnectedDevicesContext.Provider value={ { myConnectedDevices, setMyConnectedDevices } }>
      {children}
    </ConnectedDevicesContext.Provider>
  )
}

export { ConnectedDevicesContext, ConnectedDeviceContextProvider, ConnectedDeviceScanningStart, ConnectedDeviceScanningStop }
export type { IMyConnectedDevice }