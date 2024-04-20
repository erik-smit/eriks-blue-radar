import { 
    IonContent, 
    IonHeader,
    IonPage, 
    IonTitle, 
    IonToolbar,  } from '@ionic/react';
  import React from 'react';
  
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