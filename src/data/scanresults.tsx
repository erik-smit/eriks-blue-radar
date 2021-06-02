import type { ScanResult } from '@capacitor-community/bluetooth-le';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { createContext, useEffect, useState, useReducer, useContext } from 'react';

interface IMyScanResult {
  scanresult: ScanResult;
 }

const initialScanResultState: IMyScanResult[] = []

const ScanResultsContext = createContext<{
    myScanResults: IMyScanResult[];
    setMyScanResults: React.Dispatch<React.SetStateAction<IMyScanResult[]>>;
  }>({
    myScanResults: initialScanResultState,
    setMyScanResults: () => undefined,
  });

const ScanResultScanningStart = async (setMyScanResults: React.Dispatch<React.SetStateAction<IMyScanResult[]>>) => {
  setMyScanResults([]);

  await BleClient.initialize();
  await BleClient.requestLEScan({
    allowDuplicates: true,
  },
  async result => {
    setMyScanResults((prevMyScanResults) => {
      let index = -1;
      prevMyScanResults.forEach((myscanresult, pos) => {
        if (myscanresult.scanresult.device.deviceId === result.device.deviceId) {
          prevMyScanResults[index = pos].scanresult = result
        }
      });
      if (index === -1) {
        return [...prevMyScanResults, {
          scanresult: result
        }]
      } else {
        return prevMyScanResults;
      }
    });
  });
}

const ScanResultScanningStop = async () => {
  await BleClient.stopLEScan();
}
const ScanResultContextProvider: React.FC = ({children}) => {
  const [ myScanResults, setMyScanResults ] = useState(initialScanResultState)

  return (
    <ScanResultsContext.Provider value={ { myScanResults, setMyScanResults } }>
      {children}
    </ScanResultsContext.Provider>
  )
}

export { ScanResultsContext, ScanResultContextProvider, ScanResultScanningStart, ScanResultScanningStop }
export type { IMyScanResult }