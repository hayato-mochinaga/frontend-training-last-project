import React from 'react';
import styled from 'styled-components';
import TideGraph from './TideGraph';

interface TideInfoProps {
    tideInfo: {
        sun: {
            rise: string;
            set: string;
            astro_twilight: string[];
            regular_twilight: string[];
            midline: string;
        };
        moon: any;
        edd: any[];
        flood: any[];
        tide: any[];
    } | string;
}

const TideInfo: React.FC<TideInfoProps> = ({ tideInfo }) => {
    // 初期状態または`tideInfo`が空の時に「Tide Information」を表示
    if (typeof tideInfo === 'string' || !tideInfo) {
        return (
            <TideInfoWrapper>
                <h2>Tide Information</h2>
                {typeof tideInfo === 'string' && (
                    <p>{tideInfo}</p>
                )}
            </TideInfoWrapper>
        );
    }

    return (
        <TideInfoWrapper>
            <h2>Tide Information</h2>
            <TideGraph data={tideInfo.tide} sun={tideInfo.sun} />
            {/* <h3>日出・日没の情報</h3>
            <p>天文薄明: {tideInfo.sun.astro_twilight.join(' - ')}</p>
            <p>市民薄明: {tideInfo.sun.regular_twilight.join(' - ')}</p>
            <p>日の出: {tideInfo.sun.rise}</p>
            <p>太陽の南中: {tideInfo.sun.midline}</p>
            <p>日没: {tideInfo.sun.set}</p>

            <h3>月の情報</h3>
            <p>月の明るさ: {tideInfo.moon.brightness}</p>
            <p>月齢: {tideInfo.moon.age}</p>
            <p>潮汐の種類: {tideInfo.moon.title}</p>
            <p>月の出: {tideInfo.moon.rise}</p>
            <p>月の南中: {tideInfo.moon.midline}</p>
            <p>月の入り: {tideInfo.moon.set}</p>

            <h3>潮汐情報</h3>
            <ul>
                {tideInfo.tide.map((tide, index) => (
                    <li key={index}>時間: {tide.time} - 高さ: {tide.cm}cm</li>
                ))}
            </ul> */}
        </TideInfoWrapper>
    );
};

const TideInfoWrapper = styled.div`
    color: white;
`;

export default TideInfo;
