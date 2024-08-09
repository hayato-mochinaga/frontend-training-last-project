import { useState, useEffect } from 'react';
import usePortList from './usePortList';
import useTidePortList from './useTidePortList';

interface Port {
  portName: string;
}

const usePortAutoComplete = (location: string) => {
  const [portList, setPortList] = useState<Port[]>([]);
  const { portList: portList1, error: error1 } = usePortList(location);
  const { portList: portList2, error: error2 } = useTidePortList(location);

  useEffect(() => {
    const combinedPortList = [...portList1, ...portList2];
    const uniquePortList = Array.from(new Set(combinedPortList.map(port => port.portName)))
      .map(portName => combinedPortList.find(port => port.portName === portName) as Port);
    setPortList(uniquePortList);
  }, [portList1, portList2]);

  return { portList, error: error1 || error2 };
};

export default usePortAutoComplete;
