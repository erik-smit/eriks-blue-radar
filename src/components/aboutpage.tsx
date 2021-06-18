import { useState } from 'react';
import React from 'react';
import { 
  IonButton,
  IonContent, 
  IonHeader,
  IonLabel,
  IonPage, 
  IonTitle, 
  IonToolbar,  } from '@ionic/react';

import BluetoothManager_getConnectedDevices from '../plugins/BluetoothManager_getConnectedDevices';

const AboutPage: React.FC = () => {
  const [ someData, setSomeData ] = useState("");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Put stuff here</h1>
        https://github.com/erik-smit/eriks-blue-radar
        <IonButton onClick={ async (e) => {
          let ret = await BluetoothManager_getConnectedDevices.getConnectedDevices();
          setSomeData(
            JSON.stringify(ret.devices)
            );
        }}
        >press there</IonButton>
      <IonLabel>
        { someData }
      </IonLabel>
      </IonContent>
    </IonPage>
  );
};

export { AboutPage }