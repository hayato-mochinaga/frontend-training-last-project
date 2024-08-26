import React, { useState } from 'react';
import { Forecast } from '../../components/pages/Forecast';
import { prefectures } from './constants';
import usePortAutoComplete from './hooks/usePortAutoComplete';
import useGeocoder from './hooks/useGeocoder';

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
    const [tideInfoQuery, setTideInfoQuery] = useState<string>(''); // 新しいstateを追加

    const portOptions = portList.map(port => ({
        label: port.portName
    }));

    const handleSearch = async (query: string) => {
        //queryにundefinedが含まれている場合は、undefinedという文字列のみをqueryから削除
        query = query.replace('undefined', '');
        // geocode処理はそのまま
        const geocodeResult = await geocode(query);
        if (geocodeResult) {
            setLocationData(geocodeResult);
        }
        // queryをそのままtideInfoQueryに格納
        setTideInfoQuery(query);
    };

    return (
        <Forecast
            prefectureOptions={prefectures}
            prefectureLabel="都道府県名を選択"
            portOptions={portOptions}
            portLabel="漁港名を選択"
            onPrefectureChange={(prefecture: string) => {
                setSelectedPrefecture(prefecture);
                setShowPortBox(!!prefecture);
            }}
            showPortBox={showPortBox}
            onSearch={handleSearch}
            locationData={locationData}
            error={error}
            tideInfoQuery={tideInfoQuery} // TideInfo.tsxに渡すために追加
        />
    );
};
