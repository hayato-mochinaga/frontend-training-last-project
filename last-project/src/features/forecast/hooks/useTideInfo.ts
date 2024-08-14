import axios from 'axios';
import { ports, prefectures } from '../constants';

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

const useTideInfo = async (query: string): Promise<TideInfoResult | string> => {
    console.log('useTideInfoに送られたquery:', query);

    // 都道府県名を除去
    const prefecture = prefectures.find(pref => query.includes(pref.label));
    const portName = prefecture ? query.replace(prefecture.label, '').trim() : '';
    const port = ports.find(port => portName && portName === port.portName);

    if (port) {
        const pc = port.prefectureCode;
        const hc = port.portCode;

        const now = new Date();
        const yr = now.getFullYear();
        const mn = now.getMonth() + 1;
        const dy = now.getDate();

        try {
            const response = await axios.get('/tide', {
                params: {
                    pc: pc,
                    hc: hc,
                    yr: yr,
                    mn: mn,
                    dy: dy,
                    rg: 'day'
                }
            });

            const today = `${yr}-${mn.toString().padStart(2, '0')}-${dy.toString().padStart(2, '0')}`;
            const tideData = response.data.tide.chart[today];

            if (!tideData) {
                console.error('潮汐情報が見つかりませんでした:', today);
                return '潮汐情報が見つかりませんでした。';
            }

            const sun = tideData.sun;
            const moon = tideData.moon;
            const edd = tideData.edd || [];
            const flood = tideData.flood || [];
            const tide = tideData.tide || [];

            return {
                sun,
                moon,
                edd,
                flood,
                tide,
            };
        } catch (error) {
            console.error('潮汐情報の取得に失敗しました:', error);
            return '潮汐情報の取得に失敗しました。';
        }
    } else if (prefecture) {
        const relevantPorts = ports.filter(port => port.prefectureCode === prefecture.prefectureCode).map(port => port.portName);
        if (relevantPorts.length > 0) {
            const result = `「${query.replace('undefined', '')}」に、該当する港は"潮汐グラフ機能"に対応しておりません。\n「${prefecture.label}」の"潮汐グラフ機能"に対応している港は以下の通りです:\n${relevantPorts.join('\n')}`;
            console.log(result);  // 改行コードが正しく含まれているか確認するためにコンソールに出力
            return result;
        } 
    } else {
        return `「${query.replace('undefined', '')}」に、該当する港は"潮汐グラフ機能"に対応しておりません。`;
    }
};

export default useTideInfo;
