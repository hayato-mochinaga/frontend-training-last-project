import React, { useState } from 'react';
import { Forecast } from '../../components/pages/Forecast';
import { prefectures } from './constants';
import usePortAutoComplete from './hooks/usePortAutoComplete';
import useGeocoder from './hooks/useGeocoder';
import useTideInfo from './hooks/useTideInfo';

export const ForecastContainer: React.FC = () => {
    const [selectedPrefecture, setSelectedPrefecture] = useState<string>('');
    const { portList, error } = usePortAutoComplete(selectedPrefecture);
    const [showPortBox, setShowPortBox] = useState<boolean>(false);
    const [locationData, setLocationData] = useState<{
        Name: string;
        Latitude: string;
        Longitude: string;
        BoundingBox: string;
    } | null>(null);
    const geocode = useGeocoder();
    const [tideInfo, setTideInfo] = useState<string>('');

    const portOptions = portList.map(port => ({
        label: port.portName
    }));

    const handleSearch = async (query: string) => {
        // まずgeocodeを実行し、結果を設定
        const geocodeResult = await geocode(query);
        if (geocodeResult) {
            setLocationData(geocodeResult); // geocodeの結果をlocationDataに設定
        }

        // 次にuseTideInfoを実行し、結果を設定
        const tideInfoResult = await useTideInfo(query);
        setTideInfo(tideInfoResult); // useTideInfoの結果をtideInfoに設定
    };

    return (
        <Forecast
            // saerchAreaのprops
            prefectureOptions={prefectures}
            prefectureLabel="都道府県名を入力"
            portOptions={portOptions}
            portLabel="漁港名を入力"
            onPrefectureChange={(prefecture: string) => {
                setSelectedPrefecture(prefecture);
                setShowPortBox(!!prefecture);
            }}
            // WeatherYahooのprops
            showPortBox={showPortBox}
            onSearch={handleSearch}
            locationData={locationData}
            error={error}
            // TideInfoのprops
            tideInfo={tideInfo}
        />
    );
};
