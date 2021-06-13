import { FormEvent, FocusEvent, useContext, useEffect, useState } from 'react';
import { ToggleChangeEventDetail } from '@ionic/core/components';
import { useParams } from 'react-router';
import { closeOutline, toggle } from "ionicons/icons";
import React from 'react';
import { 
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar
 } from '@ionic/react';

import { ScanResultsContext, ScanResultScanningStart, ScanResultScanningStop, IMyScanResult } from '../data/scanresults'
import { MyDeviceConfigContext, IMyDeviceConfig } from '../data/mydeviceconfig';
import { ScanResultsPage } from './scanresultspage';

import WifiIcon from "../icons/ionic-icon-wifi-outline-eriks-blue-radar";
import './scanresultspage.css';

const ScanResultDetailPage: React.FC = () => {
  const params = useParams<{ index: string }>();
  const index = parseInt(params.index, 10);

  const { myScanResults } = useContext(ScanResultsContext);
  const myscanresult = myScanResults[index]

  // TODO: device not found. return here to prevent crash. maybe route.history when clearing scanresults?
  if (typeof myscanresult === 'undefined') {
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
      <ScanResultDetailPageContainer key={index} myscanresult={myscanresult} />
    </IonPage>
  );
};

interface IScanResultDetailPageContainerProps {
  myscanresult: IMyScanResult;
}

const ScanResultDetailPageContainer: React.FC<IScanResultDetailPageContainerProps> = ({ myscanresult }) => {
  const [ lastSeenSeconds, setLastSeenSeconds ] = useState(0);
  const { myDeviceConfigs, setMyDeviceConfigs } = useContext(MyDeviceConfigContext);
  const myDeviceConfig = myDeviceConfigs.find((device) => device.deviceId === myscanresult.scanresult.device.deviceId)
  const [ myDeviceFormName, setMyDeviceFormName ] = useState<string>(myDeviceConfig?.name ? myDeviceConfig?.name : "");

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSeenSeconds(Math.round((Date.now()-myscanresult.lastseen) / 1000))
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
    const myDeviceConfig = myDeviceConfigAddIfNotExist(newMyDeviceConfigs, myscanresult.scanresult.device.deviceId)
    myDeviceConfig.name = myDeviceFormName;
    setMyDeviceConfigs(newMyDeviceConfigs)
  }

  const handleNameInputBlur = async () => {
    setMyDeviceName(myscanresult.scanresult.device.deviceId, myDeviceFormName)
  }

  const signalstrengthClass =
    myscanresult.scanresult.rssi > -60 ? "signalstrength-60" :
    myscanresult.scanresult.rssi > -80 ? "signalstrength-80" :
    "signalstrength-100"

  const placeholderName = myscanresult.scanresult.localName! ? myscanresult.scanresult.localName! : "unknown device";

  return (
    <IonContent>
      <IonList>
        <div className="rssi ion-text-center"> { myscanresult.scanresult.rssi } </div>
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
          <IonLabel> MAC: { myscanresult.scanresult.device.deviceId }</IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  )
}

export { ScanResultDetailPage }