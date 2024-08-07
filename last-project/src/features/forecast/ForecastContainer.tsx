import React, { useState } from 'react';
import { Forecast } from '../../components/pages/Forecast';
import { prefectures } from './constants';
import usePortList from './hooks/usePortList';
import useGeocoder from './hooks/useGeocoder';

export const ForecastContainer: React.FC = () => {
    const [selectedPrefecture, setSelectedPrefecture] = useState<string>('');
    const { portList, error } = usePortList(selectedPrefecture);
    const [showPortBox, setShowPortBox] = useState<boolean>(false);
    const [locationData, setLocationData] = useState<{
        Name: string;
        Latitude: string;
        Longitude: string;
        BoundingBox: string;
    } | null>(null);
    const geocode = useGeocoder();

    const portOptions = portList.map(port => ({
        label: port.portName
    }));

    const handleSearch = async (query: string) => {
        const result = await geocode(query);
        if (result) {
            setLocationData(result);
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
                    locationData={locationData}
                />
            )}
        </>
    );
};
