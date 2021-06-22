import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import React from 'react';
import { 
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
 } from '@ionic/react';

import { MyDeviceConfigContext, IMyDeviceConfig } from '../data/mydeviceconfig';
import { ScanResultsContext, IMyScanResult } from '../data/scanresults';
import { ConnectedDevicesContext } from '../data/connecteddevices';

import './btdevicespage.css';

const BTDeviceDetailPage: React.FC = () => {
  const params = useParams<{ deviceId: string }>();
  const deviceId = params.deviceId;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search BLE Device</IonTitle>
        </IonToolbar>
      </IonHeader>
      <BTDeviceDetailPageContainer key={deviceId} deviceId={deviceId} />
    </IonPage>
  );
};

interface IBTDeviceDetailPageContainerProps {
  deviceId: string;
}

const BTDeviceDetailPageContainer: React.FC<IBTDeviceDetailPageContainerProps> = ({ deviceId }) => {
  const { myConnectedDevices } = useContext(ConnectedDevicesContext);
  const myConnectedDevice = myConnectedDevices.find((myconnecteddevice) => myconnecteddevice.device.deviceId === deviceId);
  
  const { myDeviceConfigs, setMyDeviceConfigs } = useContext(MyDeviceConfigContext);
  const myDeviceConfig = myDeviceConfigs.find((device) => device.deviceId === deviceId)

  const { myScanResults } = useContext(ScanResultsContext);
  const myScanResult = myScanResults.find((myscanresult) => myscanresult.scanresult.device.deviceId === deviceId);

  const [ lastSeenSeconds, setLastSeenSeconds ] = useState(0);
  const [ myDeviceFormName, setMyDeviceFormName ] = useState<string>(myDeviceConfig?.name ? myDeviceConfig?.name : "");

  useEffect(() => {
    const interval = setInterval(() => {
      const lastseen =
        myConnectedDevice ? myConnectedDevice.lastseen :
        myScanResult ? myScanResult.lastseen :
        0
      setLastSeenSeconds(Math.round((Date.now()-lastseen) / 1000))
    }, 1000);
    return () => clearInterval(interval);
  })

  const myDeviceConfigAddIfNotExist = (myDeviceConfigs: IMyDeviceConfig[], deviceId: string): IMyDeviceConfig => {
    let myDeviceConfig = myDeviceConfigs.find((device) => device.deviceId === deviceId)
    if (typeof myDeviceConfig === "undefined") {
      myDeviceConfig = {
        deviceId: deviceId,
        name: undefined
      }
      myDeviceConfigs.push(myDeviceConfig);
    }
    return myDeviceConfig
  }

  const setMyDeviceName = (deviceId: string, name: string) => {
    const newMyDeviceConfigs = [...myDeviceConfigs]
    const myDeviceConfig = myDeviceConfigAddIfNotExist(newMyDeviceConfigs, deviceId)
    myDeviceConfig.name = myDeviceFormName;
    setMyDeviceConfigs(newMyDeviceConfigs)
  }

  const handleNameInputBlur = async () => {
    setMyDeviceName(deviceId, myDeviceFormName)
  }

  const rssi = myScanResult ? myScanResult.scanresult.rssi : 0;

  const placeholderName =
    myConnectedDevice ? myConnectedDevice.device.name :
    myScanResult ? myScanResult.scanresult.localName : "unknown device";

  return (
    <IonContent>
      <IonList>
        <div className="rssi ion-text-center"> { rssi } </div>
        <IonItem>
          Last Seen: { lastSeenSeconds } seconds ago
        </IonItem>
        <IonItem>
          <IonLabel> Name: </IonLabel>
          <IonInput
            placeholder={ placeholderName }
            onBlur={ async () => await handleNameInputBlur() }
            onIonChange={ e => setMyDeviceFormName(e.detail.value!) }
            value={myDeviceFormName}
              />
        </IonItem>
        <IonItem>
          <IonLabel> MAC: { deviceId }</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  )
}

export { BTDeviceDetailPage }