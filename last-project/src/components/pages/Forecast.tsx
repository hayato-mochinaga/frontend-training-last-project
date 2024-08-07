import React from 'react';
import styled from 'styled-components';
import SearchArea from '../molecules/SearchArea/SearchArea';
import { WeatherYahoo } from '../organisms/WeatherYahoo/WeatherYahoo';

interface ForecastProps {
    prefectureOptions: { label: string; firstLetter: string; furigana: string; }[];
    prefectureLabel: string;
    portOptions: { label: string; }[];
    portLabel: string;
    onPrefectureChange: (prefecture: string) => void;
    showPortBox: boolean;
    onSearch: (query: string) => void;
    locationData: { Name: string; Latitude: string; Longitude: string; BoundingBox: string } | null;
}

export const Forecast: React.FC<ForecastProps> = ({
    prefectureOptions,
    prefectureLabel,
    portOptions,
    portLabel,
    onPrefectureChange,
    showPortBox,
    onSearch,
    locationData
}) => {
    return (
        <ForecastWrapper>
            <SearchArea
                prefectureOptions={prefectureOptions}
                prefectureLabel={prefectureLabel}
                portOptions={portOptions}
                portLabel={portLabel}
                onPrefectureChange={onPrefectureChange}
                showPortBox={showPortBox}
                onSearch={onSearch}
            />
            <MainForecastArea>
                <WeatherYahoo locationData={locationData} />
            </MainForecastArea>
        </ForecastWrapper>
    );
};

const ForecastWrapper = styled.div`
    justify-content: center;
    width: 95%;
    height: 93vh;
`;

const MainForecastArea = styled.div`
    overflow-y: auto;
    max-height: 70vh; /* 高さはお好みで調整してください */
    margin-top: 20px;
    padding: 20px;
    background-color: rgba(33, 14, 14, 0.3); /* 背景色をお好みで設定してください */
    border-radius: 10px;
`;
