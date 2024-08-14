import React from 'react';
import styled from 'styled-components';
import useWindAndTemp from '../../../features/forecast/hooks/useWindAndTemp';
import WindAndTempGraph from './WindAndTempGraph';
import LoadingAnimation from './LoadingAnimation';

interface WindAndTempProps {
    locationData: {
        Name: string;
        Latitude: string;
        Longitude: string;
    } | null;
}

export const WindAndTemp: React.FC<WindAndTempProps> = ({ locationData }) => {
    const { windAndTempData, error, isLoading } = useWindAndTemp(locationData?.Latitude || null, locationData?.Longitude || null);

    return (
        <WindAndTempWrapper>
            <h1>WindAndTempComponent</h1>
            {locationData ? (
                <div>
                    <p>地名: {locationData.Name}</p>
                    <p>緯度: {locationData.Latitude}</p>
                    <p>経度: {locationData.Longitude}</p>
                </div>
            ) : (
                <p>データがありません</p>
            )}
            {error ? (
                <p>{error}</p>
            ) : isLoading ? ( // ローディング中の場合にローディングアニメーションを表示
                <LoadingAnimation />
            ) : windAndTempData ? (
                <WindAndTempGraph data={windAndTempData} />
            ) : null}
        </WindAndTempWrapper>
    );
};

const WindAndTempWrapper = styled.div`
  color: white;
  border: 1px solid white;
  border-radius: 5px;
`;

export default WindAndTemp;
