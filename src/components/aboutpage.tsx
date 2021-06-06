import { useContext } from 'react';
import React from 'react';
import { 
  IonContent, 
  IonHeader,
  IonPage, 
  IonTitle, 
  IonToolbar,  } from '@ionic/react';

const AboutPage: React.FC = () => {
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
      </IonContent>
    </IonPage>
  );
};

export { AboutPage }