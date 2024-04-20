import { BleClient } from '@capacitor-community/bluetooth-le';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect } from 'react';
import { flashlight, gitBranch, settings, radio } from 'ionicons/icons';
import { AboutPage } from './pages/About';
import { ConnectedDevicesPage } from './pages/ConnectedDevices';
import { DeviceDetailPage } from './pages/DeviceDetail';
import { ScannedDevicesPage } from './pages/ScannedDevices';

import { ConnectedDeviceContextProvider } from './data/ConnectedDevices'
import { MyDeviceConfigContextProvider } from './data/MyDeviceConfig';
import { ScanResultContextProvider } from './data/ScanResults';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    (async () => {
      await BleClient.initialize();
    })();
    return;
  }, []);

  return (
    <MyDeviceConfigContextProvider>
      <ConnectedDeviceContextProvider>
        <ScanResultContextProvider>
          <IonApp>
            <IonReactRouter>
              <IonTabs>
                <IonRouterOutlet>
                  <Route path="/scanneddevices" component={ScannedDevicesPage} />
                  <Route path="/btdevicedetail/:deviceId" component={DeviceDetailPage} />
                  <Route path="/connecteddevices" component={ConnectedDevicesPage} />
                  <Route path="/about" component={AboutPage} />
                  <Route exact path="/" render={() => <Redirect to="/connecteddevices" />} />
                </IonRouterOutlet>
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
              </IonTabs>
            </IonReactRouter>
          </IonApp>
        </ScanResultContextProvider>
      </ConnectedDeviceContextProvider>
    </MyDeviceConfigContextProvider>
  )
};

export default App;
