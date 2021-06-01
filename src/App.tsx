import { ChangeEvent, FormEvent ,createContext, useContext, useReducer, useState } from 'react';
import { InputChangeEventDetail } from "@ionic/core";
import { closeOutline, home, settings } from "ionicons/icons"
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { 
  IonApp, 
  IonButton, 
  IonContent, 
  IonHeader,
  IonIcon, 
  IonInput, 
  IonItem, 
  IonItemDivider, 
  IonLabel, 
  IonList, 
  IonPage, 
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonTitle, 
  IonToggle, IonToolbar,  } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { TodoPage, TodosContext, TodosContextProvider } from './Todo';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  return (
  <TodosContextProvider>
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonTabBar slot="bottom">
            <IonTabButton tab="todo" href="/todo">
              <IonIcon icon={home} />
              <IonLabel>home</IonLabel>
            </IonTabButton>
      
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={settings} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>

          <IonRouterOutlet>
            <Route path="/todo" component={TodoPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route exact path="/" render={() => <Redirect to="/todo" />} />
          </IonRouterOutlet>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  </TodosContextProvider>
  );
}

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

export default App;
