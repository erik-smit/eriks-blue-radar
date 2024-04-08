import { BleClient } from '@capacitor-community/bluetooth-le';
import {
  IonApp, 
  IonIcon, 
  IonLabel, 
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { flashlight, gitBranch, radio, settings } from "ionicons/icons"
import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AboutPage } from './components/aboutpage';
import { BTDeviceDetailPage } from './components/btdevicedetailpage';
import { ConnectedDevicesPage } from './components/connecteddevicespage';
import { ScannedDevicesPage } from './components/scanneddevicespage';
import { ConnectedDeviceContextProvider } from './data/connecteddevices'
import { MyDeviceConfigContextProvider } from './data/mydeviceconfig';
import { ScanResultContextProvider } from './data/scanresults';

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
  useEffect(() => {
    (async () => {
      await BleClient.initialize();
    })();
    return;
  }, []);
  
  return (
  <ConnectedDeviceContextProvider>
    <MyDeviceConfigContextProvider>
      <ScanResultContextProvider>
        <IonApp>
          <IonReactRouter>
            <IonTabs>
              <IonTabBar slot="bottom">
                <IonTabButton tab="connecteddevices" href="/connecteddevices">
                  <IonIcon icon={gitBranch} />
                  <IonLabel>Connected Devices</IonLabel>
                </IonTabButton>

                <IonTabButton tab="scanneddevices" href="/scanneddevices">
                  <IonIcon icon={radio} />
                  <IonLabel>Scan Devices</IonLabel>
                </IonTabButton>

                <IonTabButton tab="search" href="/btdevicedetail/">
                  <IonIcon icon={flashlight} />
                  <IonLabel>Device Radar</IonLabel>
                </IonTabButton>

                <IonTabButton tab="about" href="/about">
                  <IonIcon icon={settings} />
                  <IonLabel>About</IonLabel>
                </IonTabButton>
              </IonTabBar>

              <IonRouterOutlet>
                <Route path="/scanneddevices" component={ScannedDevicesPage} />
                <Route path="/btdevicedetail/:deviceId" component={BTDeviceDetailPage} />
                <Route path="/connecteddevices" component={ConnectedDevicesPage} />
                <Route path="/about" component={AboutPage} />
                <Route exact path="/" render={() => <Redirect to="/connecteddevices" />} />
              </IonRouterOutlet>
            </IonTabs>
          </IonReactRouter>
        </IonApp>
      </ScanResultContextProvider>
    </MyDeviceConfigContextProvider>
    </ConnectedDeviceContextProvider>
  );
}

export default App;

// FIXME: https://ionicframework.com/docs/updating/6-0 says this is necessary?
setupIonicReact({
  mode: 'md'
});