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
  const { scanResults, setScanResults } = useContext(ScanResultsContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Devices</IonTitle>
          {/* <IonButtons slot="end"> */}
            <IonButton
              onClick={ async () => { await ScanResultScanningStart(setScanResults) }  }
            >Start</IonButton>
            <IonButton
              onClick={ async () => { await ScanResultScanningStop() }  }
              >Stop</IonButton>
          {/* </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {scanResults.map((scanresult, index) => (
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
  const { scanResults } = useContext(ScanResultsContext);
  const scanresult = scanResults[index]

  return (
    <IonItem routerLink={`/scanresult/${index}`} detail={false}>
      <IonLabel className="ion-text-wrap">
        <h2>
          { scanresult.device.deviceId }
        </h2>
        <span className="">
          <IonNote>
            { scanresult.rssi } dBm
          </IonNote>
        </span>
      </IonLabel>
    </IonItem>
  )
}

export { ScanResultsPage }