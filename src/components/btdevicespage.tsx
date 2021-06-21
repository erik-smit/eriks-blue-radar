import { FormEvent, useContext, useState } from 'react';
import { ToggleChangeEventDetail } from '@ionic/core/components'
import { wifiOutline } from "ionicons/icons"
import React from 'react';
import { 
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
 } from '@ionic/react';

import { ConnectedDevicesContext, ConnectedDeviceScanningStart, ConnectedDeviceScanningStop } from '../data/connecteddevices'
import { ScanResultsContext, ScanResultScanningStart, ScanResultScanningStop } from '../data/scanresults'
import { MyDeviceConfigContext } from '../data/mydeviceconfig';

import WifiIcon from "../icons/ionic-icon-wifi-outline-eriks-blue-radar";
import './btdevicespage.css';


const BTDevicesPage: React.FC = () => {
  const { myScanResults, setMyScanResults } = useContext(ScanResultsContext);
  const { myConnectedDevices, setMyConnectedDevices } = useContext(ConnectedDevicesContext);

  const handleScanToggleonChange = async (e: CustomEvent<ToggleChangeEventDetail>) => {
    console.log(e.detail.checked);
    if(e.detail.checked) {
      await ConnectedDeviceScanningStart(setMyConnectedDevices)
      await ScanResultScanningStart(setMyScanResults)
    } else {
      await ScanResultScanningStop()
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Devices</IonTitle>
          <IonToggle 
            slot="end"
            onIonChange= { async (e) => { await handleScanToggleonChange(e)}} />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {myConnectedDevices.map((myconnecteddevice, index) => (
            <ConnectedDeviceRowEntry key={index} index={index} />
          ))}          
          {myScanResults.map((myscanresult, index) => (
            <ScanResultRowEntry key={index} index={index} />
          ))}
          <IonItemDivider />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

interface IConnectedDeviceRowContainerProps {
  index: number;
}

const ConnectedDeviceRowEntry: React.FC<IConnectedDeviceRowContainerProps> = ({ index }) => {
  const { myConnectedDevices } = useContext(ConnectedDevicesContext);
  const connecteddevice = myConnectedDevices[index]

  const { myDeviceConfigs } = useContext(MyDeviceConfigContext);
  const myDeviceConfig = myDeviceConfigs.find((device) => device.deviceId === connecteddevice.device.deviceId)

  const displayName = myDeviceConfig?.name ? myDeviceConfig.name : 
    connecteddevice.device.name! ? connecteddevice.device.name! : "unknown device";

  const displayNameClass = myDeviceConfig?.name ? "displayname-set" : "displayname-default"

    return (
      <RowEntry 
        deviceId={connecteddevice.device.deviceId}
        displayName={displayName}
        displayNameClass={displayNameClass}
        signalstrength={ 0 }
        lastseen={connecteddevice.lastseen}
        />
    )
}

interface IScanResultRowContainerProps {
  index: number;
}

const ScanResultRowEntry: React.FC<IScanResultRowContainerProps> = ({ index }) => {
  const { myScanResults } = useContext(ScanResultsContext);
  const myscanresult = myScanResults[index]

  const { myDeviceConfigs } = useContext(MyDeviceConfigContext);
  const myDeviceConfig = myDeviceConfigs.find((device) => device.deviceId === myscanresult.scanresult.device.deviceId)

  const displayName = myDeviceConfig?.name ? myDeviceConfig.name : 
    myscanresult.scanresult.localName! ? myscanresult.scanresult.localName! : "unknown device";

  const displayNameClass = myDeviceConfig?.name ? "displayname-set" : "displayname-default"

  return (
    <RowEntry 
      deviceId={myscanresult.scanresult.device.deviceId}
      displayName={displayName}
      displayNameClass={displayNameClass}
      signalstrength={myscanresult.scanresult.rssi}
      lastseen={myscanresult.lastseen}
      />
  )
}

interface IRowContainerProps {
  deviceId: string;
  displayName: string;
  displayNameClass: string;
  signalstrength: number;
  lastseen: number;
}

const RowEntry: React.FC<IRowContainerProps> = ({ deviceId, displayName, displayNameClass, signalstrength, lastseen }) => {
  const signalstrengthClass =
    signalstrength > -60 ? "signalstrength-60" :
    signalstrength > -80 ? "signalstrength-80" :
    "signalstrength-100"

  return (
    <IonItem routerLink={`/btdevicedetail/${deviceId}`} detail={false}>
      <div className="ion-text-center ion-padding-end" style={{ maxWidth: "20%" }}>
        <div className={ "signalstrength " + signalstrengthClass }> <WifiIcon /> </div>
        <span> { signalstrength } </span>
      </div>
      <div className="ion-text-left ion-padding-vertical" >
        <div>
         Name: <span className={ displayNameClass }>{ displayName }</span>
        </div>
        <div>
          MAC: <span className="deviceid">{ deviceId }</span>
        </div>
        <IonNote>
          Last Seen: { Math.round((Date.now()-lastseen) / 1000) } secs ago
        </IonNote>
      </div>
    </IonItem>
  )
}

export { BTDevicesPage }