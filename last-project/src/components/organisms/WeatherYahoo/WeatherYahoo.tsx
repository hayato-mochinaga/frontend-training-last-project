import React from 'react';
import styled from 'styled-components';
import useWeatherYahoo from '../../../features/forecast/hooks/useWeatherYahoo';
import WeatherGraph from './WeatherGraph';
import { getRainfallDescription } from '../../../utils/getRainfallDescription';
import LoadingAnimation from '../../molecules/Loading/LoadingAnimation'; // LoadingAnimationをインポート

interface WeatherYahooProps {
    locationData: {
        Name: string;
        Latitude: string;
        Longitude: string;
        BoundingBox: string;
    } | null;
}

export const WeatherYahoo: React.FC<WeatherYahooProps> = ({ locationData }) => {
    const { weather, error, isLoading } = useWeatherYahoo(locationData?.Latitude || null, locationData?.Longitude || null);

    const weatherData = weather?.WeatherList.map(item => ({
        time: new Date(item.Date.slice(0, 4) + '-' + item.Date.slice(4, 6) + '-' + item.Date.slice(6, 8) + 'T' + item.Date.slice(8, 10) + ':' + item.Date.slice(10, 12)),
        rainfall: item.Rainfall
    })) ?? [];

    const rainMessage = () => {
        if (!weatherData.length) return '';

        const now = new Date();
        const rainStartIndex = weatherData.findIndex(item => item.rainfall > 0 && item.time > now);
        const rainEndIndex = weatherData.findIndex(item => item.rainfall === 0 && item.time > now && rainStartIndex !== -1);

        if (rainStartIndex === -1) {
            return "直近1時間に雨は降りません。";
        }

        if (rainStartIndex !== -1 && rainEndIndex === -1) {
            return "雨が続きます。";
        }

        if (rainStartIndex === 0) {
            return `${weatherData[rainEndIndex].time.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}に雨が止みます。`;
        }

        if (rainStartIndex > 0) {
            const minutesToRain = Math.floor((weatherData[rainStartIndex].time.getTime() - now.getTime()) / (1000 * 60));
            const rainfallDescription = getRainfallDescription(weatherData[rainStartIndex].rainfall);

            // 最初の時刻の降雨量が0以上の場合のみメッセージを表示
            if (minutesToRain >= 10) {
                return `約${minutesToRain}分後に${rainfallDescription}が降ります。`;
            }
        }

        return '';
    };

    return (
        <WeatherYahooWrapper>
            <h2 className="title">精密降雨量予測（直近1時間以内）</h2>
            {locationData ? (
                <>
                    <p className="locationName">{rainMessage()}</p>
                </>
            ) : (
                    <p className="noData">直近1時間の精密な降雨量情報を取得します。</p>
            )}

            {error ? (
                <p className="error">{error}</p>
            ) : isLoading ? ( // LoadingAnimationを表示
                <LoadingAnimation />
            ) : weather ? (
                <WeatherGraph data={weatherData.map(item => ({
                    time: item.time.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
                    rainfall: item.rainfall
                }))} />
            ) : null}
        </WeatherYahooWrapper>
    );
};

const WeatherYahooWrapper = styled.div`
  color: white;
  border-radius: 5px;

  /* WeatherGraph に影響を与えないように、特定のクラスにのみフォントを適用 */
  .title, .noData, .error, .loading {
    font-family: 'Shippori Mincho B1', serif;
  }

  .locationName {
    font-family: 'Shippori Antique', serif; /* このクラスにだけ Shippori Antique を適用 */
  }
`;

export default WeatherYahoo;
