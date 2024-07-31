import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GeoLocations: React.FC = () => {
    const [locations, setLocations] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('/api/geocode/V1/geoCoder', {
                    params: {
                        appid: 'dj00aiZpPWNibUhRUmI4QU5mcSZzPWNvbnN1bWVyc2VjcmV0Jng9YWE-', // ここにあなたのYahoo APIアプリケーションIDを入力
                        query: '東京都港区六本木',
                        output: 'json',
                    },
                });
                console.log(response.data);
                setLocations(response.data.Feature);
            } catch (error) {
                console.error('Error fetching location data', error);
                if (axios.isAxiosError(error)) {
                    console.error('Response data:', error.response?.data);
                }
                setError('位置情報の取得に失敗しました');
            }
        };

        fetchLocations();
    }, []);

    return (
        <div>
            <h1>六本木の位置情報</h1>
            {error ? (
                <p>{error}</p>
            ) : locations.length > 0 ? (
                <div>
                    <ul>
                        {locations.map((location, index) => (
                            <li key={index}>
                                <p>名前: {location.Name}</p>
                                <p>住所: {location.Property.Address}</p>
                                <p>座標: {location.Geometry.Coordinates}</p>
                                <p>バウンディングボックス: {location.Geometry.BoundingBox}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>読み込み中...</p>
            )}
        </div>
    );
};

export default GeoLocations;
