import { FormEvent, useContext, useState } from 'react';
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
  IonToolbar
 } from '@ionic/react';

import { ScanResultsContext, ScanResultScanningStart, ScanResultScanningStop } from '../data/scanresults'

const ScanResultsPage: React.FC = () => {
  const { myScanResults, setMyScanResults } = useContext(ScanResultsContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Devices</IonTitle>
          {/* <IonButtons slot="end"> */}
            <IonButton
              onClick={ async () => { await ScanResultScanningStart(setMyScanResults) }  }
            >Start</IonButton>
            <IonButton
              onClick={ async () => { await ScanResultScanningStop() }  }
              >Stop</IonButton>
          {/* </IonButtons> */}
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
      <IonLabel className="ion-text-wrap">
        <h2>
          { myscanresult.scanresult.device.deviceId }
        </h2>
        <span className="">
          <IonNote>
            { myscanresult.scanresult.rssi } dBm
          </IonNote>
        </span>
      </IonLabel>
    </IonItem>
  )
}

export { ScanResultsPage }