import React from 'react';
import { styled } from 'styled-components';
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
    forecastData: { Name: string; Coordinates: string; BoundingBox: string } | null;
}

export const Forecast: React.FC<ForecastProps> = ({
    prefectureOptions,
    prefectureLabel,
    portOptions,
    portLabel,
    onPrefectureChange,
    showPortBox,
    onSearch,
    forecastData
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
            <WeatherYahoo forecastData={forecastData} />
        </ForecastWrapper>
    );
};

const ForecastWrapper = styled('div')({
    justifyContent: 'center',
    width: '95%',
    height: '93vh',
});
