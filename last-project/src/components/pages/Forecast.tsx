import React from 'react';
import styled from 'styled-components';
import SearchArea from '../molecules/SearchArea/SearchArea';
import { WeatherYahoo } from '../organisms/WeatherYahoo/WeatherYahoo';
import TideInfoContainer from '../../features/forecast/tide/TideInfoContainer';
import { WindAndTemp } from '../organisms/WindAndTemp/WindAndTemp';
import LocationInfo from '../organisms/LocationInfo/LocationInfo';
import PortImg from '../organisms/PortImg/PortImg'; // 追加

interface ForecastProps {
    prefectureOptions: { label: string; furigana: string; prefectureCode: string; }[];
    prefectureLabel: string;
    portOptions: { label: string; }[];
    portLabel: string;
    onPrefectureChange: (prefecture: string) => void;
    showPortBox: boolean;
    onSearch: (query: string) => void;
    locationData: { Name: string; Latitude: string; Longitude: string; BoundingBox: string } | null;
    tideInfoQuery: string;
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
    tideInfoQuery,
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
                <GridContainer>
                    <LocationInfoArea>
                        <LocationInfo locationData={locationData} />
                    </LocationInfoArea>
                    <TideInfoArea>
                        <TideInfoContainer query={tideInfoQuery} />
                    </TideInfoArea>
                    <RainFallOneHourWidget>
                        <WeatherYahoo locationData={locationData} />
                    </RainFallOneHourWidget>
                    <WindAndTempArea>
                        <WindAndTemp locationData={locationData} />
                    </WindAndTempArea>
                    <PortImgArea> {/* 新しく追加 */}
                        <PortImg locationData={locationData} />
                    </PortImgArea>
                </GridContainer>
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
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto auto auto auto; /* 各エリアの高さを自動調整 */
    gap: 12.5px;
    height: 100%;
`;

const LocationInfoArea = styled.div`
    border-radius: 10px;
    grid-column: 1 / span 1; 
    grid-row: 1 / span 1; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const TideInfoArea = styled.div`
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.2);
    background: rgba( 17, 21, 56, 0.41 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 2px );
    -webkit-backdrop-filter: blur( 2px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    padding: 10px;
    grid-column: 2 / span 1; 
    grid-row: 1 / span 2; 
`;

const RainFallOneHourWidget = styled.div`
    background: rgba( 17, 21, 56, 0.41 );
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.2);
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 2px );
    -webkit-backdrop-filter: blur( 2px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    padding: 10px;
    grid-column: 1 / span 1; 
    grid-row: 2 / span 1; 
`;

const WindAndTempArea = styled.div`
    background: rgba( 17, 21, 56, 0.41 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 2px );
    -webkit-backdrop-filter: blur( 2px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    padding: 10px;
    grid-column: 1 / span 2; 
    grid-row: 3 / span 1; 
    min-height: ${({ isGraphLoaded }) => (isGraphLoaded ? '480px' : 'auto')}; /* グラフの高さに応じて調整 */
    height: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const PortImgArea = styled.div`
    background: rgba( 17, 21, 56, 0.41 );
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.2);
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 2px );
    -webkit-backdrop-filter: blur( 2px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    padding: 10px;
    grid-column: 1 / span 2; 
    grid-row: 4; /* WindAndTempの下に配置 */
`;

export default Forecast;
