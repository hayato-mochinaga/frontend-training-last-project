import React from 'react';
import styled from 'styled-components';

interface WeatherYahooProps {
    locationData: {
        Name: string;
        Latitude: string;
        Longitude: string;
        BoundingBox: string;
    } | null;
}

export const WeatherYahoo: React.FC<WeatherYahooProps> = ({ locationData }) => {
    return (
        <WeatherYahooWrapper>
            <h1>WeatherYahoo</h1>
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
        </WeatherYahooWrapper>
    );
};

const WeatherYahooWrapper = styled.div`
    color: white;
    border: 1px solid white;
    border-radius: 5px;
`;
