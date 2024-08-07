import React from 'react';
import styled from 'styled-components';
import useWeatherYahoo from '../../../features/forecast/hooks/useWeatherYahoo';

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

    return (
        <WeatherYahooWrapper>
            <h1>WeatherYahooWidget</h1>
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
            <div>ここでuseWeatherYahooを呼んで返ってきた天気予報情報を表示する。</div>
            {error ? (
                <p>{error}</p>
            ) : weather ? (
                <WeatherInfo>
                    <p>場所: {weather.Name}</p>
                    <h2>天気リスト</h2>
                    <ul>
                        {weather.WeatherList.map((item, index) => (
                            <li key={index}>
                                <p>日時: {new Date(item.Date.slice(0, 4) + '-' + item.Date.slice(4, 6) + '-' + item.Date.slice(6, 8) + 'T' + item.Date.slice(8, 10) + ':' + item.Date.slice(10, 12)).toLocaleString('ja-JP')}</p>
                                <p>天気の種類: {item.Type === 'observation' ? '観測' : '予報'}</p>
                                <p>降雨量: {item.Rainfall} mm</p>
                            </li>
                        ))}
                    </ul>
                </WeatherInfo>
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

const WeatherInfo = styled.div`
    margin-top: 20px;
`;

