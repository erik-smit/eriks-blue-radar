import { Preferences } from '@capacitor/preferences';
import { createContext, useEffect, useState } from 'react';

interface IMyDeviceConfig {
  deviceId: string;
  name: string | undefined;
 }

const initialMyDeviceConfigState: IMyDeviceConfig[] = []

const MyDeviceConfigContext = createContext<{
    myDeviceConfigs: IMyDeviceConfig[];
    setMyDeviceConfigs: React.Dispatch<React.SetStateAction<IMyDeviceConfig[]>>;
  }>({
    myDeviceConfigs: initialMyDeviceConfigState,
    setMyDeviceConfigs: () => undefined,
  });

const MYDEVICECONFIG_STORAGE = "mydeviceconfig";

//FIXME: replace with https://stackoverflow.com/a/71809927/8338773 ?
type Props = {
    children?: React.ReactNode
  };

const MyDeviceConfigContextProvider: React.FC<Props> = ({children}) => {
  const [ myDeviceConfigs, realSetMyDeviceConfigs ] = useState(initialMyDeviceConfigState)

  const setMyDeviceConfigs = (newMyDeviceConfigs: React.SetStateAction<IMyDeviceConfig[]>) => {
    Preferences.set({ key: MYDEVICECONFIG_STORAGE, value: JSON.stringify(newMyDeviceConfigs) });
    return realSetMyDeviceConfigs(newMyDeviceConfigs)
  }

  useEffect(() => {
    const loadSaved = async () => {
      const { value } = await Preferences.get({ key: MYDEVICECONFIG_STORAGE });
      const mydeviceconfigsInStorage = (value ? JSON.parse(value) : []) as IMyDeviceConfig[];

      setMyDeviceConfigs(mydeviceconfigsInStorage);
    };
    loadSaved();
  }, []);

  return (
    <MyDeviceConfigContext.Provider value={ { myDeviceConfigs, setMyDeviceConfigs } }>
      {children}
    </MyDeviceConfigContext.Provider>
  )
}

export { MyDeviceConfigContext, MyDeviceConfigContextProvider }
export type { IMyDeviceConfig }