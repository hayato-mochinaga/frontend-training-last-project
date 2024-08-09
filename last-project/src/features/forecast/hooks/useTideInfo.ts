import axios from 'axios';
import { ports } from '../constants';

const useTideInfo = async (query: string): Promise<string> => {
    console.log('useTideInfoに送られたquery:', query);

    // queryから都道府県名を除去する
    const portName = query.replace(/(北海道|青森県|岩手県|宮城県|秋田県|山形県|福島県|茨城県|栃木県|群馬県|埼玉県|千葉県|東京都|神奈川県|新潟県|富山県|石川県|福井県|山梨県|長野県|岐阜県|静岡県|愛知県|三重県|滋賀県|京都府|大阪府|兵庫県|奈良県|和歌山県|鳥取県|島根県|岡山県|広島県|山口県|徳島県|香川県|愛媛県|高知県|福岡県|佐賀県|長崎県|熊本県|大分県|宮崎県|鹿児島県|沖縄県)/, '').trim();

    // portsの中でqueryに含まれるportNameを探す
    const port = ports.find(port => portName.includes(port.portName));

    if (port) {
        const pc = port.prefectureCode;
        const hc = port.portCode;
        console.log('pc:', pc, 'hc:', hc);
        

        // APIリクエストを行い、潮汐情報を取得する
        try {
            const response = await axios.get('/tide', {
                params: {
                    pc: pc,
                    hc: hc,
                    yr: 2024,
                    mn: 8,
                    dy: 9,
                    rg: 'day'
                }
            });
            // レスポンスデータを文字列として返す
            return JSON.stringify(response.data);
        } catch (error) {
            console.error('潮汐情報の取得に失敗しました:', error);
            return '潮汐情報の取得に失敗しました。';
        }
    } else {
        return `${query}がuseTideInfoに送られましたが、該当する港が見つかりませんでした。`;
    }
};

export default useTideInfo;
