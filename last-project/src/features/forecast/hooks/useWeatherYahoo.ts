import { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
    Name: string;
    WeatherList: Array<{
        Date: string;
        Rainfall: number;
    }>;
}

const useWeatherYahoo = (latitude: string | null, longitude: string | null) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false); // ローディング状態を管理するためのステート

    useEffect(() => {
        if (!latitude || !longitude) return;

        const fetchWeather = async () => {
            setIsLoading(true); // APIリクエスト開始時にローディング状態をtrueに設定
            try {
                const response = await axios.get(
                    '/api/weather/V1/place', {
                        params: {
                            appid: 'dj00aiZpPWNibUhRUmI4QU5mcSZzPWNvbnN1bWVyc2VjcmV0Jng9YWE-',
                            coordinates: `${longitude},${latitude}`,
                            output: 'json'
                        }
                    }
                );
                const data = response.data.Feature[0].Property.WeatherList;
                setWeather({
                    Name: response.data.Feature[0].Name,
                    WeatherList: data.Weather
                });
            } catch (error) {
                console.error('Error fetching weather data', error);
                if (axios.isAxiosError(error)) {
                    console.error('Response data:', error.response?.data);
                }
                setError('天気データの取得に失敗しました');
            } finally {
                setIsLoading(false); // APIリクエストが完了したらローディング状態をfalseに設定
            }
        };

        fetchWeather();
    }, [latitude, longitude]);

    return { weather, error, isLoading }; // isLoadingを返す
};

export default useWeatherYahoo;

