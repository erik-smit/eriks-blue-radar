import type { ToggleChangeEventDetail } from '@ionic/core/components'
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
 } from '@ionic/react';
import React, { useContext } from 'react';

import { MyDeviceConfigContext } from '../data/mydeviceconfig';
import { ScanResultsContext, ScanResultScanningStart, ScanResultScanningStop } from '../data/scanresults'
import WifiIcon from "../icons/ionic-icon-wifi-outline-eriks-blue-radar";
import './devicespage.css';

const ScannedDevicesPage: React.FC = () => {
  const { myScanResults, setMyScanResults } = useContext(ScanResultsContext);

  const handleScanToggleonChange = async (e: CustomEvent<ToggleChangeEventDetail>) => {
    if(e.detail.checked) {
      await ScanResultScanningStart(setMyScanResults)
    } else {
      await ScanResultScanningStop()
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Scanned Devices</IonTitle>
          <IonToggle 
            slot="end"
            onIonChange= { async (e) => { await handleScanToggleonChange(e)}} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {myScanResults.map((myscanresult, index) => (
            <ScanResultRowEntry key={index} index={index} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

interface IScanResultRowContainerProps {
  index: number;
}

const ScanResultRowEntry: React.FC<IScanResultRowContainerProps> = ({ index }) => {
  const { myScanResults } = useContext(ScanResultsContext);
  const myscanresult = myScanResults[index]

  const { myDeviceConfigs } = useContext(MyDeviceConfigContext);
  const myDeviceConfig = myDeviceConfigs.find((device) => device.deviceId === myscanresult.scanresult.device.deviceId)

  const displayName = myDeviceConfig?.name ? myDeviceConfig.name : 
    myscanresult.scanresult.localName ? myscanresult.scanresult.localName : "unknown device";

  const displayNameClass = myDeviceConfig?.name ? "displayname-set" : "displayname-default"

  const rssi = myscanresult.scanresult.rssi;
  const signalstrengthClass =
    rssi > -60 ? "signalstrength-60" :
    rssi > -80 ? "signalstrength-80" :
    "signalstrength-100"

  return (
    <IonItem routerLink={`/btdevicedetail/${myscanresult.scanresult.device.deviceId}`} detail={false}>
      <div className="ion-text-center ion-padding-end" style={{ maxWidth: "20%" }}>
        <div className={ "signalstrength " + signalstrengthClass }> <WifiIcon /> </div>
        <span> { rssi } </span>
      </div>
      <div className="ion-text-left ion-padding-vertical" >
        <div>
        Name: <span className={ displayNameClass }>{ displayName }</span>
        </div>
        <div>
          MAC: <span className="deviceid">{ myscanresult.scanresult.device.deviceId }</span>
        </div>
        <IonNote>
          Last Seen: { Math.round((Date.now()-myscanresult.lastseen) / 1000) } secs ago
        </IonNote>
      </div>
    </IonItem>
  )
}

export { ScannedDevicesPage }