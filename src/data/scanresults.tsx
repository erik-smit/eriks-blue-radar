import type { ScanResult } from '@capacitor-community/bluetooth-le';
import { BleClient } from '@capacitor-community/bluetooth-le';
import { createContext, useEffect, useState, useReducer, useContext } from 'react';

const initialScanResultState: ScanResult[] = []

const ScanResultsContext = createContext<{
    scanResults: ScanResult[];
    setScanResults: React.Dispatch<React.SetStateAction<ScanResult[]>>;
  }>({
    scanResults: initialScanResultState,
    setScanResults: () => undefined,
  });

const ScanResultScanningStart = async (setScanResults: React.Dispatch<React.SetStateAction<ScanResult[]>>) => {
  setScanResults([]);

  await BleClient.initialize();
  await BleClient.requestLEScan({
    allowDuplicates: true,
  },
  async result => {
    setScanResults((prevScanResults) => {
      let index = -1;
      prevScanResults.forEach((scanresult, pos) => {
        if (scanresult.device.deviceId === result.device.deviceId) {
          prevScanResults[index = pos] = result
        }
      });
      if (index === -1) {
        return [...prevScanResults, result]
      } else {
        return prevScanResults;
      }
    });
  });
}

const ScanResultScanningStop = async () => {
  await BleClient.stopLEScan();
}
const ScanResultContextProvider: React.FC = ({children}) => {
  const [ scanResults, setScanResults ] = useState(initialScanResultState)

  useEffect(() => {
    // (async () => {
    //   await BleClient.initialize();
    //   await BleClient.requestLEScan({
    //     allowDuplicates: true,
    //   },
    //   async result => {
    //     setScanResults((prevScanResults) => {
    //       let index = -1;
    //       prevScanResults.filter((scanresult, pos) => {
    //         if (scanresult.device.deviceId === result.device.deviceId) {
    //           prevScanResults[index = pos] = result
    //         }
    //       });
    //       if (index === -1) {
    //         return [...prevScanResults, result]
    //       } else {
    //         return prevScanResults;
    //       }
    //     });
    //   });
    // })();
  }, []);

  return (
    <ScanResultsContext.Provider value={ { scanResults, setScanResults } }>
      {children}
    </ScanResultsContext.Provider>
  )
}

export { ScanResultsContext, ScanResultContextProvider, ScanResultScanningStart, ScanResultScanningStop }