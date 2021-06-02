import { FormEvent, useContext, useState } from 'react';
import { useParams } from 'react-router';
import { closeOutline } from "ionicons/icons"
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

import { ScanResultsContext, ScanResultScanningStart, ScanResultScanningStop } from '../data/scanresults'

const ScanResultDetailPage: React.FC = () => {
  const params = useParams<{ index: string }>();
  const index = parseInt(params.index, 10);

  const { scanResults, setScanResults } = useContext(ScanResultsContext);
  const scanresult = scanResults[index]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search BLE Device</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel className="ion-text-wrap">
              <h2>
                { scanresult.device.deviceId }
              </h2>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Name: { scanresult.device.name! }
            </IonLabel>
          </IonItem>
        </IonList>
        <IonFooter>
          <IonItem>
            Signal Strength: { scanresult.rssi } dBm
          </IonItem>
        </IonFooter>
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
    <IonItem routerLink={`/scanresult/${scanresult.device.deviceId}`} detail={false}>
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

export { ScanResultDetailPage }