import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface LocationInfoProps {
    locationData: {
        Name: string;
    } | null;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ locationData }) => {
    const [backgroundImage, setBackgroundImage] = useState<string>('/static/media/locationBack/locationBack1.png');

    // 都道府県名とそれ以降の地名に分割するロジック
    const getLocationParts = (name: string) => {
        const [prefecture, ...rest] = name.split(/(?<=県|府|都|道)/);
        return {
            prefecture,
            rest: rest.join(''),
        };
    };

    // locationDataが変わるたびにランダムな背景画像を設定
    useEffect(() => {
        if (locationData) {
            const randomImageNumber = Math.floor(Math.random() * 14) + 1;
            setBackgroundImage(`/static/media/locationBack/locationBack${randomImageNumber}.png`);
        }
    }, [locationData]);

    return (
        <BackgroundWrapper backgroundImage={backgroundImage}>
            <LocationInfoWrapper>
                {locationData ? (
                    <>
                        <p className="prefecture">{getLocationParts(locationData.Name).prefecture}</p>
                        <p className="location">{getLocationParts(locationData.Name).rest}</p>
                    </>
                ) : (
                    <>
                        <p className="info-text">都道府県名・漁港名を選択し、検索してください。</p>
                        <p className="info-text">周辺情報を取得します。</p>
                    </>
                )}
            </LocationInfoWrapper>
        </BackgroundWrapper>
    );
};

const BackgroundWrapper = styled.div<{ backgroundImage: string }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: 170px;
    height: 100%;
    width: 100%;
    background-image: url(${(props) => props.backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
`;

const LocationInfoWrapper = styled.div`
    color: white;
    padding: 10px;
    margin-left: 20px;

    p {
        font-family: 'Shippori Mincho B1', serif;
        margin: 0;
        line-height: 1; /* 行の高さを縮める */
    }

    .prefecture {
        font-size: 14px; /* 都道府県名のフォントサイズ */
        margin-bottom: 2px; /* 県名と地名の間隔を縮める */
    }

    .location {
        font-size: 39px; /* 地名のフォントサイズ（都道府県名より大きい） */
        font-weight: bold; /* 強調表示 */
    }

    .info-text {
        margin-bottom: 8px; /* 2つのp要素間の間隔を少し開ける */
    }
`;

export default LocationInfo;
