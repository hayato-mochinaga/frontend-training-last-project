import { useState, useEffect } from 'react';
import axios from 'axios';

interface WindAndTempData {
    time: string[];
    temperature: number[];
    windSpeed: number[];
    windDirection: number[];
}

const useWindAndTemp = (latitude: string | null, longitude: string | null) => {
    const [windAndTempData, setWindAndTempData] = useState<WindAndTempData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);  // isLoading状態を追加

    useEffect(() => {
        if (!latitude || !longitude) return;

        const fetchWindAndTemp = async () => {
            setIsLoading(true);  // データ取得開始時にisLoadingをtrueに設定
            try {
                const response = await axios.get(
                    'https://api.open-meteo.com/v1/forecast', {
                        params: {
                            latitude,
                            longitude,
                            hourly: 'temperature_2m,wind_speed_10m,wind_direction_10m',
                            wind_speed_unit: 'ms',  // 風速をm/sで取得する指定
                            forecast_days: 1,
                            models: 'jma_seamless'
                        }
                    }
                );

                const data = response.data.hourly;
                setWindAndTempData({
                    time: data.time,
                    temperature: data.temperature_2m,
                    windSpeed: data.wind_speed_10m,
                    windDirection: data.wind_direction_10m
                });
            } catch (error) {
                console.error('Error fetching wind and temperature data', error);
                if (axios.isAxiosError(error)) {
                    console.error('Response data:', error.response?.data);
                }
                setError('風速と気温のデータ取得に失敗しました');
            } finally {
                setIsLoading(false);  // データ取得完了時またはエラー発生時にisLoadingをfalseに設定
            }
        };

        fetchWindAndTemp();
    }, [latitude, longitude]);

    return { windAndTempData, error, isLoading };  // isLoadingを戻り値に追加
};

export default useWindAndTemp;
