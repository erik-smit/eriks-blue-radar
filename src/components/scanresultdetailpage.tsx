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

import { ScanResultsContext, ScanResultScanningStart, ScanResultScanningStop, IMyScanResult } from '../data/scanresults'
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
  const [lastSeenSeconds, setLastSeenSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSeenSeconds((Date.now()-myscanresult.lastseen) / 1000)
    }, 1000);
    return () => clearInterval(interval);
  })

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
          <IonLabel>
            Name: { myscanresult.scanresult.localName! }
          </IonLabel>
        </IonItem>
        <IonItem>
          UUID: 
          <IonList>
            { myscanresult.scanresult.uuids!.map((uuid) => (
              <IonItem>{ uuid } </IonItem>
            )) }
            </IonList>
        </IonItem>
        <IonItem>
          manufacturerData: 
          <IonList>
            { Object.keys(myscanresult.scanresult.manufacturerData!).map((manufacturer) => (
              <IonItem>{ manufacturer } </IonItem>
            )) }
            </IonList>
        </IonItem>
        <IonItem>
          serviceData: 
          <IonList>
            { Object.keys(myscanresult.scanresult.serviceData!).map((service) => (
              <IonItem>{ service } </IonItem>
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