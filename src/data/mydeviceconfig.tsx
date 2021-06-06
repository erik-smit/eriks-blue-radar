import { createContext, useEffect, useState, useReducer, useContext } from 'react';
import { Storage } from '@capacitor/storage';

interface IMyDeviceConfig {
  deviceId: string;
  lowprio: boolean;
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

const MyDeviceConfigContextProvider: React.FC = ({children}) => {
  const [ myDeviceConfigs, setMyDeviceConfigs ] = useState(initialMyDeviceConfigState)

  useEffect(() => {
    const loadSaved = async () => {
      const { value } = await Storage.get({ key: MYDEVICECONFIG_STORAGE });
      const mydeviceconfigsInStorage = (value ? JSON.parse(value) : []) as IMyDeviceConfig[];

      setMyDeviceConfigs(mydeviceconfigsInStorage);
    };
    //loadSaved();
  }, []);

  return (
    <MyDeviceConfigContext.Provider value={ { myDeviceConfigs, setMyDeviceConfigs } }>
      {children}
    </MyDeviceConfigContext.Provider>
  )
}

export { MyDeviceConfigContext, MyDeviceConfigContextProvider }
export type { IMyDeviceConfig }