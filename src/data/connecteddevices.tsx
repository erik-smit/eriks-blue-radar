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

const ConnectedDeviceGetDevices = async (setMyConnectedDevices: React.Dispatch<React.SetStateAction<IMyConnectedDevice[]>>): Promise<void> => {
  const ret = await BluetoothManager_getConnectedDevices.getConnectedDevices();
  const newMyConnectedDevices = ret.devices.map((device) => {
    return {
      device: device,
      lastseen: Date.now()
    }
  })
  setMyConnectedDevices(newMyConnectedDevices)
}

//FIXME: replace with https://stackoverflow.com/a/71809927/8338773 ?
type Props = {
  children?: React.ReactNode
};

const ConnectedDeviceContextProvider: React.FC<Props> = ({children}) => {
  const [ myConnectedDevices, setMyConnectedDevices ] = useState(initialConnectedDeviceState)

  return (
    <ConnectedDevicesContext.Provider value={ { myConnectedDevices, setMyConnectedDevices } }>
      {children}
    </ConnectedDevicesContext.Provider>
  )
}

export { ConnectedDevicesContext, ConnectedDeviceContextProvider, ConnectedDeviceGetDevices }
export type { IMyConnectedDevice }