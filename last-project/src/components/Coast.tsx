import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Coast: React.FC = () => {
    const [photos, setPhotos] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const targetLatitude = 35.3058;
    const targetLongitude = 139.3124;

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get(
                    'https://api.msil.go.jp/photo/coastal/v2/MapServer/1/query', {
                    params: {
                        f: 'json',
                        where: '1=1',
                        geometry: '139.3,35.3,139.4,35.4', // 座標範囲を広げる
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
                    const sortedPhotos = response.data.features.sort((a: any, b: any) => {
                        const distanceA = calculateDistance(targetLatitude, targetLongitude, a.geometry.y, a.geometry.x);
                        const distanceB = calculateDistance(targetLatitude, targetLongitude, b.geometry.y, b.geometry.x);
                        return distanceA - distanceB;
                    }).slice(0, 3);
                    setPhotos(sortedPhotos);
                } else {
                    setPhotos([]);
                }
            } catch (error) {
                console.error('Error fetching photos', error);
                setError('写真データの取得に失敗しました');
            }
        };

        fetchPhotos();
    }, []);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // 地球の半径（キロメートル）
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // 距離（キロメートル）
    };

    const toRadians = (degrees: number) => {
        return degrees * (Math.PI / 180);
    };

    return (
        <div>
            <h1>湘南の大磯港の海岸写真</h1>
            {error ? (
                <p>{error}</p>
            ) : photos.length > 0 ? (
                <div>
                    <ul>
                        {photos.map((photo, index) => (
                            <li key={index}>
                                <p>撮影日時: {photo.attributes?.["撮影年月日時刻"]}</p>
                                <p>場所: {photo.attributes?.["撮影位置_緯度"]}, {photo.attributes?.["撮影位置_経度"]}</p>
                                <p>機関: {photo.attributes?.["作成機関"]}</p>
                                <div dangerouslySetInnerHTML={{ __html: photo.attributes?.["海岸写真"] }} />
                                <img src={photo.attributes?.["海岸写真"].match(/<img src="([^"]+)"/)[1]} alt="海岸写真" style={{ width: '800px', height: '600px' }} />
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

export default Coast;
