import { BleClient, dataViewToText, numberToUUID } from '@capacitor-community/bluetooth-le';
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
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import type { IMyConnectedDevice } from '../data/connecteddevices';
import { ConnectedDevicesContext } from '../data/connecteddevices';
import type { IMyDeviceConfig } from '../data/mydeviceconfig';
import { MyDeviceConfigContext } from '../data/mydeviceconfig';
import type { IMyScanResult } from '../data/scanresults';
import { ScanResultsContext } from '../data/scanresults';

import './devicespage.css';

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

  return (
    <IonContent>
      <IonList>
        <Rssi deviceId={ deviceId } myConnectedDevice={ myConnectedDevice } myScanResult={ myScanResult } />
        <LastSeen myConnectedDevice={ myConnectedDevice } myScanResult={ myScanResult } />
        <NameField
          deviceId={ deviceId } myConnectedDevice={ myConnectedDevice }
          myDeviceConfig={ myDeviceConfig} myDeviceConfigs={ myDeviceConfigs }
          setMyDeviceConfigs={ setMyDeviceConfigs }
          myScanResult={ myScanResult } />
        <IonItem> <IonLabel> MAC: { deviceId }</IonLabel></IonItem>
        <ComeGattSome deviceId={ deviceId } />
      </IonList>
    </IonContent>
  )
}

interface IRssiProps {
  deviceId: string;
  myConnectedDevice?: IMyConnectedDevice;
  myScanResult?: IMyScanResult;
}

const Rssi: React.FC<IRssiProps> = ({ deviceId, myScanResult, myConnectedDevice }) => {
  const [ rssi, setRssi ] = useState(0);
  useEffect(() => {
    if (myScanResult) {
      setRssi(myScanResult.scanresult.rssi)
    } else if (myConnectedDevice) {
      const interval = setInterval(async () => {
        try {
          const result = await BleClient.readRemoteRssi(
            deviceId,
          );
          const rssiResult = result.getInt8(0);
          setRssi(rssiResult);
          myConnectedDevice.lastseen = Date.now();
        } catch (err) {
          // if readRemoteRssi fails, try to connect()
          setTimeout(async () => {
            await BleClient.connect(deviceId);
          }, 0);
        }
      }, 1000);
      ;
      return () => {
        clearInterval(interval)
      }
    }
  }, [])

  return (
    <div className="rssi ion-text-center"> { rssi } </div>
  )
}

interface IComeGattSomeProps {
  deviceId: string;
}

const ComeGattSome: React.FC<IComeGattSomeProps> = ({ deviceId }) => {
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
  const addGattStatus = (line: string) => {
    setGattStatus((old) => line + "\n" + old)
  }

  const handleGattClick = async () => {
    addGattStatus("connecting to: " + deviceId)
    await BleClient.connect(deviceId, (deviceId) => {
      addGattStatus("disconnected from: " + deviceId)
    })
    addGattStatus("connected to: " + deviceId)

    setTimeout(async () => {
      const result = await BleClient.readRemoteRssi(
        deviceId,
      );

      const dataResult = result.getInt8(0);
      addGattStatus("remote RSSI: " + result.getUint8(0).toString(2).padStart(8, "0") + "b, " + dataResult +"d dBm")
    }, 1000);


    GATT_TO_GET.forEach((GattToGet) => {
      setTimeout(async () => {
        const result = await BleClient.read(
          deviceId,
          GattToGet.service,
          GattToGet.characteristic
        );

        const dataResult = dataViewToText(result)
        addGattStatus(GattToGet.name + ": " + dataResult)
      }, 1000);
    });

    // const services = await BleClient.getServices(deviceId);
    // services.services!.forEach((service) => {
    //   const output = service.UUID + ": " + service.characteristics.join(", ");
    //   addGattStatus(output);
    //   console.log(output);
    // })
  }

  return (
    <IonItem>
      <IonButton
        onClick={ async () => await handleGattClick() }>
        COME GATT SOME!
        </IonButton>
      <IonTextarea>
      { gattStatus }
      </IonTextarea>
    </IonItem>
  )
}

interface ILastSeenProps {
  myConnectedDevice?: IMyConnectedDevice;
  myScanResult?: IMyScanResult;
}

const LastSeen: React.FC<ILastSeenProps> = ({ myConnectedDevice, myScanResult }) => {
  // last seen updater
  const [ lastSeenSeconds, setLastSeenSeconds ] = useState(0);
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

  return (
    <IonItem>
      Last Seen: { lastSeenSeconds } seconds ago
    </IonItem>
  )
}

interface INameFieldProps {
  deviceId: string;
  myConnectedDevice?: IMyConnectedDevice;
  myDeviceConfig?: IMyDeviceConfig;
  myDeviceConfigs: IMyDeviceConfig[];
  myScanResult?: IMyScanResult;
  setMyDeviceConfigs: React.Dispatch<React.SetStateAction<IMyDeviceConfig[]>>;
}

const NameField: React.FC<INameFieldProps> = ({ deviceId, myConnectedDevice, myDeviceConfig, myDeviceConfigs, myScanResult, setMyDeviceConfigs }) => {
  // maybe should be refactored into myDeviceConfig?
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

  // name update functionality
  const [ myDeviceFormName, setMyDeviceFormName ] = useState<string>(myDeviceConfig?.name ? myDeviceConfig?.name : "");
  const setMyDeviceName = (deviceId: string) => {
    const newMyDeviceConfigs = [...myDeviceConfigs]
    const myDeviceConfig = myDeviceConfigAddIfNotExist(newMyDeviceConfigs, deviceId)
    myDeviceConfig.name = myDeviceFormName;
    setMyDeviceConfigs(newMyDeviceConfigs)
  }

  const handleNameInputBlur = async () => {
    setMyDeviceName(deviceId)
  }

  const placeholderName =
    myConnectedDevice ? myConnectedDevice.device.name :
    myScanResult ? myScanResult.scanresult.localName : "unknown device";

  return (
    <IonItem>
      <IonLabel> Name: </IonLabel>
      <IonInput
        placeholder={ placeholderName }
        onBlur={ async () => await handleNameInputBlur() }
        onIonChange={ e => setMyDeviceFormName(e.detail.value ? e.detail.value : "") }
        value={myDeviceFormName}
          />
    </IonItem>
  )
}

export { BTDeviceDetailPage }