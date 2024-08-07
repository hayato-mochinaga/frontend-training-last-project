import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WaterTemperature: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://api.msil.go.jp/water-temperature-link/v2/MapServer/1/query', {
                    params: {
                        f: 'json',
                        where: '1=1',
                        geometry: '139.3,35.2,139.6,35.4', // 湘南周辺の座標範囲を指定
                        geometryType: 'esriGeometryEnvelope',
                        outFields: '*',
                        outSR: '4326',
                        returnGeometry: true
                    },
                    headers: {
                        'Ocp-Apim-Subscription-Key': '0e83ad5d93214e04abf37c970c32b641' // ここにあなたの試用サブスクリプションキーを入力します。
                    }
                });
                console.log(response.data);
                if (response.data.features && response.data.features.length > 0) {
                    setData(response.data.features);
                } else {
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching data', error);
                setError('データの取得に失敗しました: ' + error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>湘南周辺の水温情報</h1>
            {error ? (
                <p>{error}</p>
            ) : data.length > 0 ? (
                <div>
                    <ul>
                        {data.map((item, index) => (
                            <li key={index}>
                                <p>情報: {item.attributes?.["情報"]}</p>
                                <p>観測地点: {item.attributes?.["観測地点"]}</p>
                                <p>ブイ等名称: {item.attributes?.["ブイ等名称"]}</p>
                                <p>観測頻度: {item.attributes?.["観測頻度"]}</p>
                                <p>所在地: {item.attributes?.["所在地"]}</p>
                                <p>リンク先: {item.attributes?.["リンク先"]}</p>
                                <div dangerouslySetInnerHTML={{ __html: item.attributes?.["リンクURL"] }} />
                                <p>出典・情報提供者: {item.attributes?.["出典・情報提供者"]}</p>
                                <p>位置: 緯度 {item.geometry?.y}, 経度 {item.geometry?.x}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>データが見つかりませんでした</p>
            )}
        </div>
    );
};

export default WaterTemperature;
