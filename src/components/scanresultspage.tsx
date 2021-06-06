import { FormEvent, useContext, useState } from 'react';
import { ToggleChangeEventDetail } from '@ionic/core/components'
import { wifiOutline } from "ionicons/icons"
import React from 'react';
import { 
  IonButton,
  IonButtons,
  IonContent,
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
  IonToolbar,
 } from '@ionic/react';

import { ScanResultsContext, ScanResultScanningStart, ScanResultScanningStop } from '../data/scanresults'
import { MyDeviceConfigContext } from '../data/mydeviceconfig';

import WifiIcon from "../icons/ionic-icon-wifi-outline-eriks-blue-radar";
import './scanresultspage.css';


const ScanResultsPage: React.FC = () => {
  const { myScanResults, setMyScanResults } = useContext(ScanResultsContext);

  const handleScanToggleonChange = async (e: CustomEvent<ToggleChangeEventDetail>) => {
    console.log(e.detail.checked);
    if(e.detail.checked) {
      await ScanResultScanningStart(setMyScanResults)
    } else {
      await ScanResultScanningStop()
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Devices</IonTitle>
          <IonToggle 
            slot="end"
            onIonChange= { async (e) => { await handleScanToggleonChange(e)}} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {myScanResults.map((myscanresult, index) => (
            <ScanResultRowEntry key={index} index={index} />
          ))}
          <IonItemDivider />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

interface IScanResultRowContainerProps {
  index: number;
}

const ScanResultRowEntry: React.FC<IScanResultRowContainerProps> = ({ index }) => {
  const { myScanResults } = useContext(ScanResultsContext);
  const myscanresult = myScanResults[index]

  const { myDeviceConfigs } = useContext(MyDeviceConfigContext);
  const myDeviceConfig = myDeviceConfigs.find((device) => device.deviceId === myscanresult.scanresult.device.deviceId)

  const displayName = myDeviceConfig?.name ? myDeviceConfig.name : myscanresult.scanresult.localName!;

  const signalstrengthClass =
    myscanresult.scanresult.rssi > -60 ? "signalstrength-60" :
    myscanresult.scanresult.rssi > -80 ? "signalstrength-80" :
    "signalstrength-100"

  return (
    <IonItem routerLink={`/scanresult/${index}`} detail={false}>
      <div className="ion-text-center ion-padding-end" style={{ maxWidth: "20%" }}>
        <div className={ "signalstrength " + signalstrengthClass }> <WifiIcon /> </div>
        <span> { myscanresult.scanresult.rssi } </span>
      </div>
      <div className="ion-text-left ion-padding-vertical" >
        <div>
         Name: <span className="displayname">{ displayName }</span>
        </div>
        <div>
          MAC: <span className="deviceid">{ myscanresult.scanresult.device.deviceId }</span>
        </div>
        <IonNote>
          Last Seen: { Math.round((Date.now()-myscanresult.lastseen) / 1000) } secs ago
        </IonNote>
      </div>
    </IonItem>
  )
}

export { ScanResultsPage }