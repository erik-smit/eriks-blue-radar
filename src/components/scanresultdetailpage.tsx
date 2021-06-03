import { FormEvent, useContext, useEffect, useState } from 'react';
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

  const [lastSeenSeconds, setLastSeenSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSeenSeconds((Date.now()-myscanresult.lastseen) / 1000)
    }, 1000);
    return () => clearInterval(interval);
  })

  const { myScanResults } = useContext(ScanResultsContext);
  const myscanresult = myScanResults[index]

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
                { myscanresult.scanresult.device.deviceId }
              </h2>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Name: { myscanresult.scanresult.device.name! }
            </IonLabel>
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
    </IonPage>
  );
};

export { ScanResultDetailPage }