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

  const { myConnectedDevices } = useContext(ConnectedDevicesContext);
  const myConnectedDevice = myConnectedDevices.find((myconnecteddevice) => myconnecteddevice.device.deviceId === deviceId);

  const { myDeviceConfigs } = useContext(MyDeviceConfigContext);
  const myDeviceConfig = myDeviceConfigs.find((mydevice) => mydevice.deviceId === deviceId);

  const { myScanResults } = useContext(ScanResultsContext);
  const myScanResult = myScanResults.find((myscanresult) => myscanresult.scanresult.device.deviceId === deviceId);

  // TODO: device not found. return here to prevent crash. maybe route.history when clearing scanresults?
  if (typeof myScanResult === 'undefined' ) {
    return (
      <IonPage>
        Device not found
      </IonPage>
    )
  }

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

  const [ lastSeenSeconds, setLastSeenSeconds ] = useState(0);

  const { myConnectedDevices } = useContext(ConnectedDevicesContext);
  const myConnectedDevice = myConnectedDevices.find((myconnecteddevice) => myconnecteddevice.device.deviceId === deviceId);
  
  const { myDeviceConfigs, setMyDeviceConfigs } = useContext(MyDeviceConfigContext);
  const myDeviceConfig = myDeviceConfigs.find((device) => device.deviceId === deviceId)

  const { myScanResults } = useContext(ScanResultsContext);
  const myScanResult = myScanResults.find((myscanresult) => myscanresult.scanresult.device.deviceId === deviceId);

  const [ myDeviceFormName, setMyDeviceFormName ] = useState<string>(myDeviceConfig?.name ? myDeviceConfig?.name : "");

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSeenSeconds(Math.round((Date.now()-myScanResult!.lastseen) / 1000))
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

  const signalstrengthClass =
    myScanResult!.scanresult.rssi > -60 ? "signalstrength-60" :
    myScanResult!.scanresult.rssi > -80 ? "signalstrength-80" :
    "signalstrength-100"

  const placeholderName = myScanResult!.scanresult.localName! ? myScanResult!.scanresult.localName! : "unknown device";

  return (
    <IonContent>
      <IonList>
        <div className="rssi ion-text-center"> { myScanResult!.scanresult.rssi } </div>
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
          <IonLabel> MAC: { myScanResult!.scanresult.device.deviceId }</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  )
}

export { BTDeviceDetailPage }