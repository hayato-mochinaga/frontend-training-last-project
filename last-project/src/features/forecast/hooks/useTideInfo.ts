import axios from 'axios';

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
    const [portCode, prefectureCode] = query.split(',');

    const now = new Date();
    const yr = now.getFullYear();
    const mn = now.getMonth() + 1;
    const dy = now.getDate();

    try {
        const response = await axios.get('/tide', {
            params: {
                pc: prefectureCode,
                hc: portCode,
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
};

export default useTideInfo;
