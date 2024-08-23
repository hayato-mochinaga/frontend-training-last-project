import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import TideGraph from './TideGraph';

interface TideInfoProps {
    tideInfo: any;
    relevantPorts: { portName: string, furigana: string }[];
    loading: boolean;
    error: string | null;
    handleCopy: (portName: string) => void;
    toastMessage: string | null;
    query: string;
}

const TideInfo: React.FC<TideInfoProps> = ({ tideInfo, relevantPorts, loading, error, handleCopy, toastMessage, query }) => {

    const [copiedPort, setCopiedPort] = useState<string | null>(null);

    const handleCopyClick = (portName: string) => {
        handleCopy(portName);
        setCopiedPort(portName);
        setTimeout(() => setCopiedPort(null), 3000);
    };

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

    // "都道府県名と漁港名が入力されていません。" が tideInfo に設定されている場合は、他の要素を表示しない
    if (tideInfo === "都道府県名と漁港名が入力されていません。") {
        return (
            <TideInfoWrapper>
                <h2>Tide Information</h2>
                <p>{tideInfo}</p>
            </TideInfoWrapper>
        );
    }

    if (typeof tideInfo === 'string' || !tideInfo) {
        const prefectureLabel = query.includes('undefined') ? query.replace('undefined', '') : query;
        return (
            <TideInfoWrapper>
                <h2>Tide Information</h2>
                {typeof tideInfo === 'string' && (
                    <>
                        <p>{tideInfo}</p>
                        {relevantPorts.length > 0 && (
                            <>
                                <p>潮汐グラフ機能に対応している「{prefectureLabel}」の港の一覧は以下の通りとなります。</p>
                                <ScrollableList>
                                    {relevantPorts.map((port, index) => (
                                        <ListItem key={index}>
                                            {port.portName}（{port.furigana}）
                                            <CopyIconWrapper>
                                                {copiedPort !== port.portName && (
                                                    <Tooltip className="tooltip">
                                                        {`「${port.portName}」をクリップボードにコピー`}
                                                    </Tooltip>
                                                )}
                                                <CopyIconContainer onClick={() => handleCopyClick(port.portName)}>
                                                    {copiedPort === port.portName ? (
                                                        <CopySuccess>
                                                            <CheckIconStyled fontSize="small" />
                                                            <CopyText>コピーされました</CopyText>
                                                        </CopySuccess>
                                                    ) : (
                                                        <ContentCopyIconStyled fontSize="small" />
                                                    )}
                                                </CopyIconContainer>
                                            </CopyIconWrapper>
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

    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
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
    gap: 8px;
    margin-bottom: 8px;
`;

const CopyIconWrapper = styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    margin-top: 0px;
    margin-left: -13px;

    &:hover .tooltip {
        visibility: visible;
        opacity: 1;
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const CopySuccess = styled.div`
    display: flex;
    align-items: center;
    animation: ${fadeIn} 0.3s ease-in-out, ${fadeOut} 0.3s ease-in-out 2.7s; /* 2.7秒後にフェードアウトを開始 */
`;

const iconStyles = css`
    width: 1.07rem; /* アイコンの幅を固定 */
    height: 1.07rem; /* アイコンの高さを固定 */
`;

const CopyIconContainer = styled.div`
    display: flex;
    align-items: center;
    color: white;

    &:hover {
        color: gray;
    }
`;

const ContentCopyIconStyled = styled(ContentCopyIcon)`
    ${iconStyles}
`;

const CheckIconStyled = styled(CheckIcon)`
    ${iconStyles}
    color: white; /* チェックアイコンはホバーで色が変わらない */
`;

const CopyText = styled.span`
    margin-left: 8px;
    font-size: 0.85rem;
    color: #ffffffd3;
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
    left: 110%;
    white-space: nowrap;
    font-size: 0.75rem;

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
