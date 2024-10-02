import { useState, useEffect } from 'react';
import axios from 'axios';

interface WindAndTempData {
    time: string[];
    temperature: number[];
    windSpeed: number[];
    windDirection: number[];
    cloudCover: number[];
    rain: number[];
}

const useWindAndTemp = (latitude: string | null, longitude: string | null) => {
    const [windAndTempData, setWindAndTempData] = useState<WindAndTempData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!latitude || !longitude) return;

        const fetchWindAndTemp = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    'https://api.open-meteo.com/v1/forecast', {
                        params: {
                            latitude,
                            longitude,
                            hourly: 'temperature_2m,rain,cloud_cover,wind_speed_10m,wind_direction_10m',
                            wind_speed_unit: 'ms',
                            forecast_days: 1,
                            // models: 'jma_seamless',
                            timezone: 'Asia/Tokyo' 
                        }
                    }
                );

                const data = response.data.hourly;
                
                setWindAndTempData({
                    time: data.time,
                    temperature: data.temperature_2m,
                    windSpeed: data.wind_speed_10m,
                    windDirection: data.wind_direction_10m,
                    cloudCover: data.cloud_cover,
                    rain: data.rain, 
                });
            } catch (error) {
                console.error('風速と気温のデータ取得中にエラーが発生しました', error);  // 日本語に変更
                setError('風速と気温のデータ取得に失敗しました');
            } finally {
                setIsLoading(false);
            }
        };

        fetchWindAndTemp();
    }, [latitude, longitude]);

    return { windAndTempData, error, isLoading };
};

export default useWindAndTemp;
