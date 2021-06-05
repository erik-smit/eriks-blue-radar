import { FormEvent, useContext, useState } from 'react';
import { ToggleChangeEventDetail } from '@ionic/core/components'
import { closeOutline } from "ionicons/icons"
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

  return (
    <IonItem routerLink={`/scanresult/${index}`} detail={false}>
      <IonLabel className="ion-text-start">
        <h2>
        Name: { myscanresult.scanresult.localName! }  
        </h2>
        <h2>
          { myscanresult.scanresult.device.deviceId }
        </h2>
        <IonNote>
          Last Seen: { (Date.now()-myscanresult.lastseen) / 1000 } secs ago
        </IonNote>
        <IonLabel className="ion-text-end">
        { myscanresult.scanresult.rssi } dBm
        </IonLabel>
      </IonLabel>
    </IonItem>
  )
}

export { ScanResultsPage }