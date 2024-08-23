import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ports, prefectures } from '../../../features/forecast/constants';
import useTideInfo from '../../../features/forecast/hooks/useTideInfo';
import TideGraph from './TideGraph';

interface TideInfoProps {
    query: string;
}

interface TideData {
    time: string;
    unix: number;
    cm: number;
}

interface TideInfoResult {
    sun: {
        astro_twilight: string[];
        regular_twilight: string[];
        rise: string;
        midline: string;
        set: string;
    };
    moon: {
        brightness: string;
        age: string;
        title: string;
        rise: string;
        midline: string;
        set: string;
    };
    edd: TideData[];
    flood: TideData[];
    tide: TideData[];
}

// 都道府県をクエリから取得する関数
const getPrefecture = (query: string) => {
    return prefectures.find(pref => query.includes(pref.label));
};

// 港の名前をクエリから取得する関数
const getPortName = (query: string, prefectureLabel: string | undefined) => {
    return prefectureLabel ? query.replace(prefectureLabel, '').trim() : '';
};

// 港情報を取得する関数
const getPort = (portName: string) => {
    return ports.find(port => portName && portName === port.portName);
};

// 都道府県内の港のリストを取得する関数
const getPortsInPrefecture = (prefectureCode: string) => {
    return ports.filter(port => port.prefectureCode === prefectureCode).map(port => port.portName);
};

const useFetchTideInfo = (query: string) => {
    const [tideInfo, setTideInfo] = useState<TideInfoResult | string | null>(null);
    const [relevantPorts, setRelevantPorts] = useState<{ portName: string, furigana: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchTideInfo = async () => {
            setLoading(true);
            setError(null);

            try {
                const prefecture = getPrefecture(query);
                const portName = getPortName(query, prefecture?.label);
                const port = getPort(portName);

                if (port) {// 潮汐情報が取得可能な港の場合
                    const tideInfoResult = await useTideInfo(`${port.portCode},${port.prefectureCode}`);
                    setTideInfo(await tideInfoResult);
                } else if (prefecture) {
                    const portsInPrefecture = getPortsInPrefecture(prefecture.prefectureCode);
                    const portsWithFurigana = portsInPrefecture.map(portName => {
                        const port = ports.find(p => p.portName === portName);
                        return { portName: port?.portName || '', furigana: port?.furigana || '' };
                    });
                    setRelevantPorts(portsWithFurigana);
                    setTideInfo(`「${query}」に、該当する港は"潮汐グラフ機能"に対応しておりません。`);
                } else {
                    setTideInfo(`「${query}」に、該当する港は"潮汐グラフ機能"に対応しておりません。`);
                }
            } catch (error) {
                setError('潮汐グラフ情報の取得に失敗しました。ネットワークの接続状況を確認し、再度お試しください。');
            } finally {
                setLoading(false);
            }
        };

        fetchTideInfo();
    }, [query]);

    const handleCopy = (portName: string) => {
        navigator.clipboard.writeText(portName).then(() => {
            setToastMessage(`「${portName}」をコピーしました！`);
            setTimeout(() => setToastMessage(null), 2000); // 2秒後にトーストメッセージを消す
        });
    };

    return { tideInfo, relevantPorts, loading, error, handleCopy, toastMessage };
};

const TideInfo: React.FC<TideInfoProps> = ({ query }) => {
    const { tideInfo, relevantPorts, loading, error, handleCopy, toastMessage } = useFetchTideInfo(query);

    if (loading) {
        return <TideInfoWrapper>ロード中...</TideInfoWrapper>;
    }

    if (error) {
        return (
            <TideInfoWrapper>
                <h2>Tide Information</h2>
                <p>{error}</p>
            </TideInfoWrapper>
        );
    }

    if (typeof tideInfo === 'string' || !tideInfo) {
        const prefectureLabel = getPrefecture(query)?.label || query.replace('undefined', '');
        return (
            <TideInfoWrapper>
                <h2>Tide Information</h2>
                {typeof tideInfo === 'string' && (
                    <>
                        <p>{tideInfo}</p>
                        {relevantPorts.length > 0 && (
                            <>
                                <p>「潮汐グラフ機能」に対応している「{prefectureLabel}」の港の一覧は以下の通りとなります。</p>
                                <ScrollableList>
                                    {relevantPorts.map((port, index) => (
                                        <ListItem key={index}>
                                            <CopyIconWrapper>
                                                <CopyIcon onClick={() => handleCopy(port.portName)}>
                                                    <ContentCopyIcon fontSize="small" />
                                                </CopyIcon>
                                                <Tooltip className="tooltip">
                                                    {`「${port.portName}」をクリップボードにコピー`}
                                                </Tooltip>
                                            </CopyIconWrapper>
                                            {port.portName}（{port.furigana}）
                                        </ListItem>
                                    ))}
                                </ScrollableList>
                            </>
                        )}
                    </>
                )}
                {toastMessage && <Toast>{toastMessage}</Toast>}
            </TideInfoWrapper>
        );
    }

    return (
        <TideInfoWrapper>
            <h2>{query}港の本日の潮汐グラフ</h2>
            <TideGraph data={tideInfo.tide} sun={tideInfo.sun} />
        </TideInfoWrapper>
    );
};

const TideInfoWrapper = styled.div`
    color: white;
    height: 100%;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const ScrollableList = styled.ul`
    flex: 1;
    overflow-y: auto;
    margin: 0;
    padding-right: 20px;
    padding-bottom: 10px;

    /* スクロールバーの幅と高さを小さくする */
    &::-webkit-scrollbar {
        width: 8px;  /* 縦スクロールバーの幅を8pxに設定 */
        height: 8px;  /* 横スクロールバーの高さを8pxに設定 */
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #ffffffd3;
        border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #f0f0f0;
    }
`;

const ListItem = styled.li`
    display: flex;
    align-items: center;
    gap: 8px; /* アイコンとテキストの間に少し隙間を開ける */
    margin-bottom: 8px; /* リストの項目間に縦の隙間を少し開ける */
`;

const CopyIconWrapper = styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;

    &:hover .tooltip {
        visibility: visible;
        opacity: 1;
    }
`;

const CopyIcon = styled.div`
    color: white;

    &:hover {
        color: gray;
    }

    svg {
        font-size: 1.1rem; /* アイコンのサイズを少し小さく */
    }
`;

const Tooltip = styled.div`
    visibility: hidden;
    opacity: 0;
    background-color: #000000e6;
    color: white;
    text-align: center;
    border-radius: 4px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    left: 110%; /* ツールチップをアイコンの右側に配置 */
    white-space: nowrap;
    font-size: 0.75rem; /* ツールチップの文字サイズを小さく */

    /* アニメーション効果 */
    transition: opacity 0.3s ease-in 0.6s;
`;


const Toast = styled.div`
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    z-index: 1000;
`;

export default TideInfo;
