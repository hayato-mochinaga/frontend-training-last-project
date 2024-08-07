import React, { useState } from 'react';
import { Forecast } from '../../components/pages/Forecast';
import { prefectures } from './constants';
import usePortList from './hooks/usePortList';
import useSearchForecast from './hooks/useSearchForecast';

export const ForecastContainer: React.FC = () => {
    const [selectedPrefecture, setSelectedPrefecture] = useState<string>('');
    const { portList, error } = usePortList(selectedPrefecture);
    const [showPortBox, setShowPortBox] = useState<boolean>(false);
    const [forecastData, setForecastData] = useState<{
        Name: string;
        Coordinates: string;
        BoundingBox: string;
    } | null>(null);
    const searchForecast = useSearchForecast();

    const portOptions = portList.map(port => ({
        label: port.portName
    }));

    const handleSearch = async (query: string) => {
        const result = await searchForecast(query);
        if (result) {
            setForecastData(result);
        }
    };

    return (
        <>
            {error ? (
                <p>{error}</p>
            ) : (
                <Forecast
                    prefectureOptions={prefectures}
                    prefectureLabel="都道府県名を入力"
                    portOptions={portOptions}
                    portLabel="漁港名を入力"
                    onPrefectureChange={(prefecture: string) => {
                        setSelectedPrefecture(prefecture);
                        setShowPortBox(!!prefecture);
                    }}
                    showPortBox={showPortBox}
                    onSearch={handleSearch}
                    forecastData={forecastData}
                />
            )}
        </>
    );
};
