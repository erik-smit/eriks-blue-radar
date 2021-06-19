import { createContext, useEffect, useState, useReducer, useContext } from 'react';

import type { BleDevice } from '@capacitor-community/bluetooth-le';
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

const ConnectedDeviceScanningStart = async (setMyConnectedDevices: React.Dispatch<React.SetStateAction<IMyConnectedDevice[]>>) => {
  setMyConnectedDevices([]);
  let ret = await BluetoothManager_getConnectedDevices.getConnectedDevices();
  let newMyConnectedDevices = initialConnectedDeviceState;
  ret.devices.forEach((device) => {
    newMyConnectedDevices.push({
      device: device,
      lastseen: Date.now()
    })
  })
  setMyConnectedDevices(newMyConnectedDevices)
}

const ConnectedDeviceScanningStop = async () => {
  
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