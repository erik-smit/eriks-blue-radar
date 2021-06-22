import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import React from 'react';
import { 
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar
 } from '@ionic/react';

import { BleClient, dataViewToText, numberToUUID } from '@capacitor-community/bluetooth-le';

import { MyDeviceConfigContext, IMyDeviceConfig } from '../data/mydeviceconfig';
import { ScanResultsContext, IMyScanResult } from '../data/scanresults';
import { ConnectedDevicesContext } from '../data/connecteddevices';

import './btdevicespage.css';

const BTDeviceDetailPage: React.FC = () => {
  const params = useParams<{ deviceId: string }>();
  const deviceId = params.deviceId;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search BLE Device</IonTitle>
        </IonToolbar>
      </IonHeader>
      <BTDeviceDetailPageContainer key={deviceId} deviceId={deviceId} />
    </IonPage>
  );
};

interface IBTDeviceDetailPageContainerProps {
  deviceId: string;
}

const BTDeviceDetailPageContainer: React.FC<IBTDeviceDetailPageContainerProps> = ({ deviceId }) => {
  const { myConnectedDevices } = useContext(ConnectedDevicesContext);
  const myConnectedDevice = myConnectedDevices.find((myconnecteddevice) => myconnecteddevice.device.deviceId === deviceId);
  
  const { myDeviceConfigs, setMyDeviceConfigs } = useContext(MyDeviceConfigContext);
  const myDeviceConfig = myDeviceConfigs.find((device) => device.deviceId === deviceId)

  const { myScanResults } = useContext(ScanResultsContext);
  const myScanResult = myScanResults.find((myscanresult) => myscanresult.scanresult.device.deviceId === deviceId);

  const [ lastSeenSeconds, setLastSeenSeconds ] = useState(0);
  const [ myDeviceFormName, setMyDeviceFormName ] = useState<string>(myDeviceConfig?.name ? myDeviceConfig?.name : "");

  useEffect(() => {
    const interval = setInterval(() => {
      const lastseen =
        myConnectedDevice ? myConnectedDevice.lastseen :
        myScanResult ? myScanResult.lastseen :
        0
      setLastSeenSeconds(Math.round((Date.now()-lastseen) / 1000))
    }, 1000);
    return () => clearInterval(interval);
  })

  const myDeviceConfigAddIfNotExist = (myDeviceConfigs: IMyDeviceConfig[], deviceId: string): IMyDeviceConfig => {
    let myDeviceConfig = myDeviceConfigs.find((device) => device.deviceId === deviceId)
    if (typeof myDeviceConfig === "undefined") {
      myDeviceConfig = {
        deviceId: deviceId,
        name: undefined
      }
      myDeviceConfigs.push(myDeviceConfig);
    }
    return myDeviceConfig
  }

  const setMyDeviceName = (deviceId: string, name: string) => {
    const newMyDeviceConfigs = [...myDeviceConfigs]
    const myDeviceConfig = myDeviceConfigAddIfNotExist(newMyDeviceConfigs, deviceId)
    myDeviceConfig.name = myDeviceFormName;
    setMyDeviceConfigs(newMyDeviceConfigs)
  }

  const handleNameInputBlur = async () => {
    setMyDeviceName(deviceId, myDeviceFormName)
  }

  const rssi = myScanResult ? myScanResult.scanresult.rssi : 0;

  const placeholderName =
    myConnectedDevice ? myConnectedDevice.device.name :
    myScanResult ? myScanResult.scanresult.localName : "unknown device";


  const GENERIC_ACCESS_SERVICE = numberToUUID(0x1800);
  const GENERIC_ACCESS_SERVICE_DEVICE_NAME = numberToUUID(0x2A00);

  const DEVICE_INFORMATION_SERVICE = numberToUUID(0x180a)
  const DEVICE_INFORMATION_SERVICE_MANUFACTURER_NAME_STRING = numberToUUID(0x2a29)
  const DEVICE_INFORMATION_SERVICE_MODEL_NUMBER_STRING = numberToUUID(0x2a24)
  const DEVICE_INFORMATION_SERVICE_HARDWARE_REVISION_STRING = numberToUUID(0x2a27)
  const DEVICE_INFORMATION_SERVICE_FIRMWARE_REVISION_STRING = numberToUUID(0x2a26)

  const GATT_TO_GET = [
    { name: "Device Name: ", service: GENERIC_ACCESS_SERVICE, characteristic: GENERIC_ACCESS_SERVICE_DEVICE_NAME },
    { name: "Manufacturer: ", service: DEVICE_INFORMATION_SERVICE, characteristic: DEVICE_INFORMATION_SERVICE_MANUFACTURER_NAME_STRING },
    { name: "Model Number: ", service: DEVICE_INFORMATION_SERVICE, characteristic: DEVICE_INFORMATION_SERVICE_MODEL_NUMBER_STRING },
    { name: "Hardware Revision: ", service: DEVICE_INFORMATION_SERVICE, characteristic: DEVICE_INFORMATION_SERVICE_HARDWARE_REVISION_STRING },
    { name: "Firmware Revision: ", service: DEVICE_INFORMATION_SERVICE, characteristic: DEVICE_INFORMATION_SERVICE_FIRMWARE_REVISION_STRING }
  ]

  const [ gattStatus, setGattStatus ] = useState("");
  const handleGattClick = async () => {
    setGattStatus((old) => old + "connecting to: " + deviceId + "\n")
    await BleClient.connect(deviceId, (deviceId) => {
      setGattStatus((old) => old + "disconnected from: " + deviceId + "\n")
    })
    setGattStatus((old) => old + "connected to: " + deviceId + "\n")

    GATT_TO_GET.forEach((GattToGet) => {
      setTimeout(async () => {
        const result = await BleClient.read(
          deviceId,
          GattToGet.service,
          GattToGet.characteristic
        );

        const dataResult = dataViewToText(result)
        setGattStatus((old) => old + GattToGet.name + ": " + dataResult + "\n")
      }, 1000);
    });

    // const services = await BleClient.getServices(deviceId);
    // services.services!.forEach((service) => {
    //   const output = service.UUID + ": " + service.characteristics.join(", ");
    //   setGattStatus((old) => old + output + "\n");
    //   console.log(output);
    // })
  }

  return (
    <IonContent>
      <IonList>
        <div className="rssi ion-text-center"> { rssi } </div>
        <IonItem>
          Last Seen: { lastSeenSeconds } seconds ago
        </IonItem>
        <IonItem>
          <IonLabel> Name: </IonLabel>
          <IonInput
            placeholder={ placeholderName }
            onBlur={ async () => await handleNameInputBlur() }
            onIonChange={ e => setMyDeviceFormName(e.detail.value!) }
            value={myDeviceFormName}
              />
        </IonItem>
        <IonItem>
          <IonLabel> MAC: { deviceId }</IonLabel>
        </IonItem>
        <IonButton
          onClick={ async () => await handleGattClick() }>
          COME GATT SOME!
        </IonButton>
        <IonItem>
          <IonTextarea>
          { gattStatus }
          </IonTextarea>
        </IonItem>
      </IonList>
    </IonContent>
  )
}

export { BTDeviceDetailPage }