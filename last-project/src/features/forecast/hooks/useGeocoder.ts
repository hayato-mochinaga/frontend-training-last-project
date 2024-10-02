import axios from 'axios';

type GeocodeResult = {
    Name: string;
    Latitude: string;
    Longitude: string;
    BoundingBox: string;
} | null;

// キャッシュを関数外に定義し、再利用できるようにする
const cache: { [query: string]: GeocodeResult } = {};

const useGeocoder = () => {
    const geocode = async (query: string | null): Promise<GeocodeResult> => {
        if (query === null) {
            console.error('検索のための文字列がnullまたは未定義です');
            return null;
        }

        const trimmedQuery = query.trim();

        if (trimmedQuery === '') {
            console.error('検索のための文字列が空です');
            return null;
        }

        // 過去に同じ検索が行われている場合、その結果を返す
        if (cache[trimmedQuery]) {
            // console.log(`以前の検索結果を使用します: ${trimmedQuery}`);
            return cache[trimmedQuery];
        }

        console.log(`新しい検索を行います: ${trimmedQuery}...`);

        try {
            const response = await axios.get(
                '/api/geocode/V1/geoCoder', {
                    params: {
                        appid: 'dj00aiZpPWNibUhRUmI4QU5mcSZzPWNvbnN1bWVyc2VjcmV0Jng9YWE-',
                        query: trimmedQuery,
                        output: 'json'
                    }
                }
            );

            if (response.data && response.data.Feature && response.data.Feature.length > 0) {
                const feature = response.data.Feature[0];
                const [longitude, latitude] = feature.Geometry.Coordinates.split(',');

                // 座標の解析に失敗した場合、nullを返す
                if (!longitude || !latitude) {
                    console.error('座標の形式が正しくありません');
                    return null;
                }

                const result: GeocodeResult = {
                    Name: feature.Name,
                    Latitude: latitude,
                    Longitude: longitude,
                    BoundingBox: feature.Geometry.BoundingBox
                };

                // 結果を保存
                cache[trimmedQuery] = result;

                return result;
            } else {
                console.error('結果が見つかりませんでした');
                return null;
            }
        } catch (error) {
            console.error('位置情報の取得中にエラーが発生しました', error);
            return null;
        }
    };

    return geocode;
};

export default useGeocoder;
