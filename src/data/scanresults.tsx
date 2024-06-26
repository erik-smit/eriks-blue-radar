import type { ScanResult } from '@capacitor-community/bluetooth-le';
import { ScanMode , BleClient } from '@capacitor-community/bluetooth-le';
import { createContext, useState } from 'react';

interface IMyScanResult {
  scanresult: ScanResult;
  lastseen: number;
 }

const initialScanResultState: IMyScanResult[] = []

const ScanResultsContext = createContext<{
    myScanResults: IMyScanResult[];
    setMyScanResults: React.Dispatch<React.SetStateAction<IMyScanResult[]>>;
  }>({
    myScanResults: initialScanResultState,
    setMyScanResults: () => undefined,
  });

const ScanResultScanningStart = async (setMyScanResults: React.Dispatch<React.SetStateAction<IMyScanResult[]>>): Promise<void> => {
  setMyScanResults([]);

  await BleClient.requestLEScan({
    allowDuplicates: true,
    scanMode: ScanMode.SCAN_MODE_LOW_LATENCY
  },
  async result => {
    setMyScanResults((prevMyScanResults) => {
      let index = -1;
      const myScanResult: IMyScanResult = {
        scanresult: result,
        lastseen: Date.now()
      }
      prevMyScanResults.forEach((myscanresult, pos) => {
        if (myscanresult.scanresult.device.deviceId === result.device.deviceId) {
          prevMyScanResults[index = pos] = myScanResult
        }
      });
      if (index === -1) {
        return [...prevMyScanResults, myScanResult]
      } else {
        return prevMyScanResults;
      }
    });
  });
}

const ScanResultScanningStop = async (): Promise<void> => {
  await BleClient.stopLEScan();
}

//FIXME: replace with https://stackoverflow.com/a/71809927/8338773 ?
type Props = {
    children?: React.ReactNode
  };

const ScanResultContextProvider: React.FC<Props> = ({children}) => {
  const [ myScanResults, setMyScanResults ] = useState(initialScanResultState)

  return (
    <ScanResultsContext.Provider value={ { myScanResults, setMyScanResults } }>
      {children}
    </ScanResultsContext.Provider>
  )
}

export { ScanResultsContext, ScanResultContextProvider, ScanResultScanningStart, ScanResultScanningStop }
export type { IMyScanResult }