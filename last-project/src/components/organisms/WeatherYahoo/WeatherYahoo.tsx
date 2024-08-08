import React from 'react';
import styled from 'styled-components';
import useWeatherYahoo from '../../../features/forecast/hooks/useWeatherYahoo';
import WeatherGraph from './WeatherGraph';

interface WeatherYahooProps {
    locationData: {
        Name: string;
        Latitude: string;
        Longitude: string;
        BoundingBox: string;
    } | null;
}

export const WeatherYahoo: React.FC<WeatherYahooProps> = ({ locationData }) => {
    const { weather, error } = useWeatherYahoo(locationData?.Latitude || null, locationData?.Longitude || null);

    const weatherData = weather?.WeatherList.map(item => ({
        time: new Date(item.Date.slice(0, 4) + '-' + item.Date.slice(4, 6) + '-' + item.Date.slice(6, 8) + 'T' + item.Date.slice(8, 10) + ':' + item.Date.slice(10, 12)).toLocaleString('ja-JP', {
            hour: 'numeric', minute: 'numeric'
        }),
        rainfall: item.Rainfall
    })) ?? [];

    return (
        <WeatherYahooWrapper>
            <h1>１時間降雨量WeatherYahooWidget</h1>
            {locationData ? (
                <>
                    <p>地名: {locationData.Name}</p>
                    <p>緯度: {locationData.Latitude}</p>
                    <p>経度: {locationData.Longitude}</p>
                    <p>BoundingBox: {locationData.BoundingBox}</p>
                </>
            ) : (
                <p>データがありません</p>
            )}
            <div>useWeatherYahooを呼んで返ってきた天気予報情報を表示する。</div>
            {error ? (
                <p>{error}</p>
            ) : weather ? (
                <WeatherGraph data={weatherData} />
            ) : (
                <p>読み込み中...</p>
            )}
        </WeatherYahooWrapper>
    );
};

const WeatherYahooWrapper = styled.div`
  color: white;
  border: 1px solid white;
  border-radius: 5px;
`;

export default WeatherYahoo;
