import { home, settings } from "ionicons/icons"
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { 
  IonApp, 
  IonIcon, 
  IonLabel, 
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { SettingsPage } from './components/settingspage';
import { TodoPage } from './components/todopage';
import { TodosContextProvider } from './data/todo'

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

export default App;
