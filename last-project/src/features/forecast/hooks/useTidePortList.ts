import { useState, useEffect } from 'react';
import { prefectures, ports } from '../constants';

interface Port {
  portName: string;
}

interface UseTidePortListResult {
  portList: Port[];
  error: string | null;
}

const useTidePortList = (location: string): UseTidePortListResult => {
  const [portList, setPortList] = useState<Port[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const prefecture = prefectures.find(p => p.label === location);
      if (!prefecture) {
        throw new Error('都道府県名が見つかりません');
      }

      const tidePorts = ports.filter(port => port.prefectureCode === prefecture.prefectureCode);
      setPortList(tidePorts.map(port => ({ portName: port.portName })));
    } catch (err) {
      console.error('Error fetching tide port data', err);
      setError('潮汐港名の取得に失敗しました');
    }
  }, [location]);

  return { portList, error };
};

export default useTidePortList;
