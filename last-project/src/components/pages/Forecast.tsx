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
            <WeatherYahoo locationData={locationData} />
        </ForecastWrapper>
    );
};

const ForecastWrapper = styled('div')({
    justifyContent: 'center',
    width: '95%',
    height: '93vh',
});
