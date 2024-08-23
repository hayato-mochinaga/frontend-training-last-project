import { useState, useEffect } from 'react';
import { ports, prefectures } from '../constants';
import useTideInfo from './useTideInfo';

interface TideData {
    time: string;
    unix: number;
    cm: number;
}

interface TideInfoResult {
    sun: {
        astro_twilight: string[];
        regular_twilight: string[];
        rise: string;
        midline: string;
        set: string;
    };
    moon: {
        brightness: string;
        age: string;
        title: string;
        rise: string;
        midline: string;
        set: string;
    };
    edd: TideData[];
    flood: TideData[];
    tide: TideData[];
}

// 都道府県をクエリから取得する関数
const getPrefecture = (query: string) => {
    return prefectures.find(pref => query.includes(pref.label));
};

// 港の名前をクエリから取得する関数
const getPortName = (query: string, prefectureLabel: string | undefined) => {
    return prefectureLabel ? query.replace(prefectureLabel, '').trim() : '';
};

// 港情報を取得する関数
const getPort = (portName: string) => {
    return ports.find(port => portName && portName === port.portName);
};

// 都道府県内の港のリストを取得する関数
const getPortsInPrefecture = (prefectureCode: string) => {
    return ports.filter(port => port.prefectureCode === prefectureCode).map(port => port.portName);
};

const useFetchTideInfo = (query: string) => {
    const [tideInfo, setTideInfo] = useState<TideInfoResult | string | null>(null);
    const [relevantPorts, setRelevantPorts] = useState<{ portName: string, furigana: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchTideInfo = async () => {
            setLoading(true);
            setError(null);

            try {
                if (!query) {
                    setTideInfo("都道府県名と漁港名が入力されていません。");
                    return;
                }

                const prefecture = getPrefecture(query);
                const portName = getPortName(query, prefecture?.label);
                const port = getPort(portName);

                if (port) {// 潮汐情報が取得可能な港の場合
                    const tideInfoResult = await useTideInfo(`${port.portCode},${port.prefectureCode}`);
                    setTideInfo(await tideInfoResult);
                } else if (prefecture) {
                    const portsInPrefecture = getPortsInPrefecture(prefecture.prefectureCode);
                    const portsWithFurigana = portsInPrefecture.map(portName => {
                        const port = ports.find(p => p.portName === portName);
                        return { portName: port?.portName || '', furigana: port?.furigana || '' };
                    });
                    setRelevantPorts(portsWithFurigana);
                    if (portName === '') {
                        setTideInfo("漁港名が選択されていません。");
                    } else {
                        setTideInfo(`${query}港は、潮汐グラフ機能に対応しておりません。`);
                    }
                } else {
                    setTideInfo(`${query}港は、潮汐グラフ機能に対応しておりません。`);
                }
            } catch (error) {
                setError('潮汐グラフ情報の取得に失敗しました。ネットワークの接続状況を確認し、再度お試しください。');
            } finally {
                setLoading(false);
            }
        };

        fetchTideInfo();
    }, [query]);

    const handleCopy = (portName: string) => {
        navigator.clipboard.writeText(portName).then(() => {
            setToastMessage(`「${portName}」をコピーしました`);
            setTimeout(() => setToastMessage(null), 2000); // 2秒後にトーストメッセージを消す
        });
    };

    return { tideInfo, relevantPorts, loading, error, handleCopy, toastMessage };
};

export default useFetchTideInfo;
