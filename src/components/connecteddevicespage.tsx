import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/react';
import React, { useContext, useEffect } from 'react';

import { ConnectedDevicesContext, ConnectedDeviceGetDevices } from '../data/connecteddevices'
import { MyDeviceConfigContext } from '../data/mydeviceconfig';
import './devicespage.css';

const ConnectedDevicesPage: React.FC = () => {
  const { myConnectedDevices, setMyConnectedDevices } = useContext(ConnectedDevicesContext);

    useEffect(() => {
    const interval = setInterval(async () => {
      await ConnectedDeviceGetDevices(setMyConnectedDevices)
    }, 10000);
    ;
    return () => {
      clearInterval(interval)
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Connected Devices</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {myConnectedDevices.map((myconnecteddevice, index) => (
            <ConnectedDeviceRowEntry key={index} index={index} />
          ))}          
        </IonList>
      </IonContent>
    </IonPage>
  );
};

interface IConnectedDeviceRowContainerProps {
  index: number;
}

const ConnectedDeviceRowEntry: React.FC<IConnectedDeviceRowContainerProps> = ({ index }) => {
  const { myConnectedDevices } = useContext(ConnectedDevicesContext);
  const connecteddevice = myConnectedDevices[index]

  const { myDeviceConfigs } = useContext(MyDeviceConfigContext);
  const myDeviceConfig = myDeviceConfigs.find((device) => device.deviceId === connecteddevice.device.deviceId)

  const displayName = myDeviceConfig?.name ? myDeviceConfig.name : 
    connecteddevice.device.name ? connecteddevice.device.name : "unknown device";

  const displayNameClass = myDeviceConfig?.name ? "displayname-set" : "displayname-default"

  return (
    <IonItem routerLink={`/btdevicedetail/${connecteddevice.device.deviceId}`} detail={false}>
      <div className="ion-text-left ion-padding-vertical" >
        <div>
        Name: <span className={ displayNameClass }>{ displayName }</span>
        </div>
        <div>
          MAC: <span className="deviceid">{ connecteddevice.device.deviceId }</span>
        </div>
      </div>
    </IonItem>
  )
}


export { ConnectedDevicesPage }