import React from 'react';
import { styled } from 'styled-components';
import SearchArea from '../molecules/SearchArea/SearchArea';

interface ForecastProps {
    prefectureOptions: { label: string; firstLetter: string; furigana: string; }[];
    prefectureLabel: string;
    portOptions: { label: string; }[];
    portLabel: string;
    onPrefectureChange: (prefecture: string) => void;
    showPortBox: boolean;
}

export const Forecast: React.FC<ForecastProps> = ({ prefectureOptions, prefectureLabel, portOptions, portLabel, onPrefectureChange, showPortBox }) => {
    return (
        <ForecastWrapper>
            <SearchArea
                prefectureOptions={prefectureOptions}
                prefectureLabel={prefectureLabel}
                portOptions={portOptions}
                portLabel={portLabel}
                onPrefectureChange={onPrefectureChange}
                showPortBox={showPortBox}
            />
        </ForecastWrapper>
    );
};

const ForecastWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    width: '95%',
    height: '93vh',
});
