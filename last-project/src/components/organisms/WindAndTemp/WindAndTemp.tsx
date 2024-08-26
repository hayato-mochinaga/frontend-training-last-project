import React from 'react';
import styled from 'styled-components';
import useWindAndTemp from '../../../features/forecast/hooks/useWindAndTemp';
import WindAndTempGraph from './WindAndTempGraph';
import LoadingAnimation from '../../molecules/Loading/LoadingAnimation';

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
            <Title>1時間ごとの気象予報</Title>
            {locationData ? (
                <div>
                    {/* <p>地名: {locationData.Name}</p>
                    <p>緯度: {locationData.Latitude}</p>
                    <p>経度: {locationData.Longitude}</p> */}
                </div>
            ) : (
                <Text>1時間ごとの風速・風向を含めた気象予報を取得します。</Text>
            )}
            {error ? (
                <Text>{error}</Text>
            ) : isLoading ? (
                <LoadingAnimation />
            ) : windAndTempData ? (
                <GraphContainer>
                    <WindAndTempGraph data={windAndTempData} />
                </GraphContainer>
            ) : null}
        </WindAndTempWrapper>
    );
};

const WindAndTempWrapper = styled.div`
  color: white;
  height: 100%;
`;

const Title = styled.h1`
  font-family: 'Shippori Antique', serif;
  font-weight: 300;
`;

const Text = styled.p`
  font-family: 'Shippori Antique', serif;
  font-weight: 300;
`;

const GraphContainer = styled.div`
  /* グラフにはフォントスタイルを適用しないためのコンテナ */
`;

export default WindAndTemp;
