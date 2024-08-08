import React from 'react';
import styled from 'styled-components';
import SearchArea from '../molecules/SearchArea/SearchArea';
import { WeatherYahoo } from '../organisms/WeatherYahoo/WeatherYahoo';

interface ForecastProps {
    prefectureOptions: { label: string; furigana: string; prefectureCode: string; }[];
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
                <RainFallOneHourWidget>
                    <WeatherYahoo locationData={locationData} />
                </RainFallOneHourWidget>
            </MainForecastArea>
        </ForecastWrapper>
    );
};

const ForecastWrapper = styled.div`
    width: 95%;
    height: 93vh;
`;

const MainForecastArea = styled.div`
    overflow-y: auto;
    width: 95%;
    height: 100%;
    max-height: 79vh;
    margin-top: 20px;
    padding: 20px;
    background-color: rgba(33, 14, 14, 0.3);
    border-radius: 10px;
    display: flex;
    flex: 1;
    border: 1px solid white;
`;

const RainFallOneHourWidget = styled.div`
    overflow-y: auto;
    width: 100%;
    height: 100%;
    background-color: #20689225;
    border-radius: 10px;
    border: 1px solid white;
`;

export default Forecast;
