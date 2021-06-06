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
        lowprio: true,
        name: undefined
      }
      myDeviceConfigs.push(myDeviceConfig);
    }
    return myDeviceConfig
  }

  const toggleLowPrio = (deviceId: string) => {
    const newMyDeviceConfigs = [...myDeviceConfigs]
    const myDeviceConfig = myDeviceConfigAddIfNotExist(newMyDeviceConfigs, myscanresult.scanresult.device.deviceId)
    myDeviceConfig.lowprio = !myDeviceConfig.lowprio
    setMyDeviceConfigs(newMyDeviceConfigs)
  }

  const handleLowPrioToggleChange = async (e: CustomEvent<ToggleChangeEventDetail>) => {
    toggleLowPrio(myscanresult.scanresult.device.deviceId)
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


  return (
    <IonContent>
      <IonList>
        <IonItem>
          <IonLabel className="ion-text-wrap">
            <h2>
              { myscanresult.scanresult.device.deviceId }
            </h2>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel> Name: </IonLabel>
          <IonInput
            placeholder={ myscanresult.scanresult.localName! }
            onBlur={ async () => await handleNameInputBlur() }
            onIonChange={ e => setMyDeviceFormName(e.detail.value!) }
            value={myDeviceFormName}
                    />
        </IonItem>
        <IonItem>
          <IonLabel>
            Low prio:
            <IonToggle
              checked={myDeviceConfig?.lowprio}
              onIonChange= { async (e) => { await handleLowPrioToggleChange(e)}} />
          </IonLabel>
        </IonItem>
        <IonItem>
          UUID: 
          <IonList>
            { myscanresult.scanresult.uuids!.map((uuid, index) => (
              <IonItem key={index}>{ uuid } </IonItem>
            )) }
            </IonList>
        </IonItem>
        <IonItem>
          manufacturerData: 
          <IonList>
            { Object.keys(myscanresult.scanresult.manufacturerData!).map((manufacturer, index) => (
              <IonItem key={index}>{ manufacturer } </IonItem>
            )) }
            </IonList>
        </IonItem>
        <IonItem>
          serviceData: 
          <IonList>
            { Object.keys(myscanresult.scanresult.serviceData!).map((service, index) => (
              <IonItem key={index}>{ service } </IonItem>
            )) }
            </IonList>
        </IonItem>
      </IonList>
      <IonFooter>
        <IonItem>
          Last Seen: { lastSeenSeconds } seconds ago
        </IonItem>
        <IonItem>
          Signal Strength: { myscanresult.scanresult.rssi } dBm
        </IonItem>
      </IonFooter>
    </IonContent>
  )
}

export { ScanResultDetailPage }