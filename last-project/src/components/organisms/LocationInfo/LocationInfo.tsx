import React, { useEffect, useState, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

interface LocationInfoProps {
    locationData: {
        Name: string;
    } | null;
}

const LocationInfo: React.FC<LocationInfoProps> = ({ locationData }) => {
    const [currentBackgroundImage, setCurrentBackgroundImage] = useState<string>('/static/media/locationBack/locationBack1.png');
    const [nextBackgroundImage, setNextBackgroundImage] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    // getLocationPartsをuseMemoでmemo化
    const getLocationParts = useMemo(() => {
        if (!locationData) return { prefecture: '', rest: '' };
        const [prefecture, ...rest] = locationData.Name.split(/(?<=県|府|都|道)/);
        return {
            prefecture,
            rest: rest.join(''),
        };
    }, [locationData]);

    useEffect(() => {
        if (locationData && !isAnimating) {
            const randomImageNumber = Math.floor(Math.random() * 14) + 1;
            const newImage = `/static/media/locationBack/locationBack${randomImageNumber}.png`;

            // アニメーションが完了するまで次のアニメーションを防ぐ
            setIsAnimating(true);
            setNextBackgroundImage(newImage);

            setTimeout(() => {
                setCurrentBackgroundImage(newImage);
                setNextBackgroundImage(null);
                setIsAnimating(false);  // アニメーションが完了したらリセット
            }, 500); // アニメーションの時間に合わせる
        }
    }, [locationData]);

    return (
        <BackgroundWrapper>
            <BackgroundLayer backgroundImage={currentBackgroundImage} />
            {nextBackgroundImage && (
                <BackgroundLayer backgroundImage={nextBackgroundImage} isFadingIn />
            )}
            <LocationInfoWrapper>
                {locationData ? (
                    <>
                        <p className="prefecture">{getLocationParts.prefecture}</p>
                        <p className="location">{getLocationParts.rest}</p>
                    </>
                ) : (
                    <>
                        <p className="info-text">都道府県名と漁港名を選択し、検索してください。</p>
                        <p className="info-text">周辺情報を取得します。</p>
                    </>
                )}
            </LocationInfoWrapper>
        </BackgroundWrapper>
    );
};

// フェードインアニメーションを定義
const fadeIn = keyframes`
    from { opacity: 0; filter: blur(10px); }
    to { opacity: 1; filter: blur(0); }
`;

const BackgroundWrapper = styled.div`
    position: relative;
    min-height: 170px;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    overflow: hidden; /* 背景画像がコンテナからはみ出さないようにする */
`;

const BackgroundLayer = styled.div<{ backgroundImage: string; isFadingIn?: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${(props) => props.backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: opacity 0.5s ease-in-out;
    opacity: ${(props) => (props.isFadingIn ? 0 : 1)};
    animation: ${(props) => props.isFadingIn && fadeIn} 0.5s ease-in-out forwards;
`;

const LocationInfoWrapper = styled.div`
    position: relative; /* 背景画像の上に表示するために相対位置を設定 */
    color: white;
    padding: 10px;
    margin-left: 20px;
    z-index: 1; /* 背景画像の上に表示されるようにする */
    display: flex;
    flex-direction: column;
    justify-content: center; /* 上下中央に配置 */
    height: 100%; /* 親要素の高さを継承して、中央配置を正確に行う */

    p {
        font-family: 'Shippori Mincho B1', serif;
        font-size: large;
        margin: 0;
        line-height: 1;
    }

    .prefecture {
        font-size: 14px;
        margin-bottom: 2px;
    }

    .location {
        font-size: 39px;
        font-weight: bold;
    }

    .info-text {
        font-size: 18px;
        margin-bottom: 8px;
    }
`;

export default LocationInfo;
