import { home, search, settings } from "ionicons/icons"
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

import { AboutPage } from './components/aboutpage';
import { TodoPage } from './components/todopage';
import { TodoEditPage } from './components/todoeditpage';
import { TodosContextProvider } from './data/todo';
import { ConnectedDeviceContextProvider } from './data/connecteddevices'
import { ScanResultContextProvider } from './data/scanresults';
import { MyDeviceConfigContextProvider } from './data/mydeviceconfig';
import { BTDevicesPage } from './components/btdevicespage';
import { BTDeviceDetailPage } from './components/btdevicedetailpage';

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
  <ConnectedDeviceContextProvider>
    <MyDeviceConfigContextProvider>
      <ScanResultContextProvider>
        <TodosContextProvider>
          <IonApp>
            <IonReactRouter>
              <IonTabs>
                <IonTabBar slot="bottom">
                  <IonTabButton tab="scanresults" href="/scanresults">
                    <IonIcon icon={home} />
                    <IonLabel>Devices</IonLabel>
                  </IonTabButton>

                  <IonTabButton tab="search" href="/btdevicedetail/">
                    <IonIcon icon={search} />
                    <IonLabel>Detail</IonLabel>
                  </IonTabButton>

                  <IonTabButton tab="about" href="/about">
                    <IonIcon icon={settings} />
                    <IonLabel>About</IonLabel>
                  </IonTabButton>
                </IonTabBar>

                <IonRouterOutlet>
                  <Route path="/scanresults" component={BTDevicesPage} />
                  <Route path="/btdevicedetail/:deviceId" component={BTDeviceDetailPage} />
                  <Route path="/todo" component={TodoPage} />
                  <Route path="/todoedit/:id" component={TodoEditPage} />
                  <Route path="/about" component={AboutPage} />
                  <Route exact path="/" render={() => <Redirect to="/scanresults" />} />
                </IonRouterOutlet>
              </IonTabs>
            </IonReactRouter>
          </IonApp>
        </TodosContextProvider>
      </ScanResultContextProvider>
    </MyDeviceConfigContextProvider>
    </ConnectedDeviceContextProvider>
  );
}

export default App;
