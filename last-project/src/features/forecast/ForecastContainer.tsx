import React, { useState } from 'react';
import { Forecast } from '../../components/pages/Forecast';
import { prefectures } from './constants';
import usePortList from './hooks/usePortList';
// import { useForm } from 'react-hook-form';

export const ForecastContainer: React.FC = () => {
    const [selectedPrefecture, setSelectedPrefecture] = useState<string>('');
    const { portList, error } = usePortList(selectedPrefecture);
    const [showPortBox, setShowPortBox] = useState<boolean>(false);

    const portOptions = portList.map(port => ({
        label: port.portName
    }));



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
                />
            )}
        </>
    );
};
