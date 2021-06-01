import { useContext } from 'react';
import React from 'react';
import { 
  IonContent, 
  IonHeader,
  IonPage, 
  IonTitle, 
  IonToolbar,  } from '@ionic/react';

import { TodosContext } from '../data/todo'

const SettingsPage: React.FC = () => {
  const { state } = useContext(TodosContext);

  const TodoList = JSON.stringify(state.todos);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Settings</h1>
        {TodoList}
      </IonContent>
    </IonPage>
  );
};

export { SettingsPage }