import React from 'react';
import styled from 'styled-components';

interface WeatherYahooProps {
    forecastData: {
        Name: string;
        Coordinates: string;
        BoundingBox: string;
    } | null;
}

export const WeatherYahoo: React.FC<WeatherYahooProps> = ({ forecastData }) => {
    return (
        <WeatherYahooWrapper>
            <h1>WeatherYahoo</h1>
            {forecastData ? (
                <>
                    <p>地名: {forecastData.Name}</p>
                    <p>経度緯度: {forecastData.Coordinates}</p>
                    <p>BoundingBox: {forecastData.BoundingBox}</p>
                </>
            ) : (
                <p>データがありません</p>
            )}
        </WeatherYahooWrapper>
    );
};

const WeatherYahooWrapper = styled.div`
    color: white;
`;
