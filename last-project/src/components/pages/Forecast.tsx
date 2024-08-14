import React from 'react';
import styled from 'styled-components';
import SearchArea from '../molecules/SearchArea/SearchArea';
import { WeatherYahoo } from '../organisms/WeatherYahoo/WeatherYahoo';
import TideInfo from '../organisms/TideInfo/TideInfo';
import { WindAndTemp } from '../organisms/WindAndTemp/WindAndTemp'; // 追加

interface ForecastProps {
    prefectureOptions: { label: string; furigana: string; prefectureCode: string; }[];
    prefectureLabel: string;
    portOptions: { label: string; }[];
    portLabel: string;
    onPrefectureChange: (prefecture: string) => void;
    showPortBox: boolean;
    onSearch: (query: string) => void;
    locationData: { Name: string; Latitude: string; Longitude: string; BoundingBox: string } | null;
    tideInfo: string; // 追加
}

export const Forecast: React.FC<ForecastProps> = ({
    prefectureOptions,
    prefectureLabel,
    portOptions,
    portLabel,
    onPrefectureChange,
    showPortBox,
    onSearch,
    locationData,
    tideInfo // 追加
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
                <WindAndTempArea>
                    <WindAndTemp locationData={locationData} /> 
                </WindAndTempArea>
                <RainFallOneHourWidget>
                    <WeatherYahoo locationData={locationData} />
                </RainFallOneHourWidget>
                <TideInfoArea>
                    <TideInfo tideInfo={tideInfo} />
                </TideInfoArea>
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

const TideInfoArea = styled.div`
    overflow-y: auto;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 1px solid white;
`;

const WindAndTempArea = styled.div` /* 追加 */
    overflow-y: auto;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    border: 1px solid white;
`;

