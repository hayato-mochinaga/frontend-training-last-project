import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import TideGraph from './TideGraph';
import LoadingAnimation from '../../molecules/Loading/LoadingAnimation';

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

    // 都道府県名を抽出する関数
    const extractPrefecture = (query: string): string => {
        const prefectures = ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"];
        return prefectures.find(prefecture => query.startsWith(prefecture)) || query;
    };

    const prefectureLabel = extractPrefecture(query);

    if (loading) {
        return (
            <TideInfoWrapper>
                <LoadingAnimation />
            </TideInfoWrapper>
        );
    }

    if (error) {
        return (
            <TideInfoWrapper>
                <Title>本日の潮汐グラフ</Title>
                <Message>{error}</Message>
            </TideInfoWrapper>
        );
    }

    // "本日の潮汐情報を取得します。" が tideInfo に設定されている場合は、他の要素を表示しない
    if (tideInfo === "本日の詳細な潮汐情報を取得します。") {
        return (
            <TideInfoWrapper>
                <Title>本日の潮汐グラフ</Title>
                <Message>{tideInfo}</Message>
            </TideInfoWrapper>
        );
    }

    if (typeof tideInfo === 'string' || !tideInfo) {
        return (
            <TideInfoWrapper>
                <Title>本日の潮汐グラフ</Title>
                {typeof tideInfo === 'string' && (
                    <>
                        <Message>{tideInfo}</Message>
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
            <Title>{query}港の本日の潮汐グラフ</Title>
            <SubTitle>潮汐種別：{tideInfo.tideType}</SubTitle> {/* 潮汐種別を表示 */}
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

const Title = styled.h2`
    font-family: 'Shippori Antique', serif;
    font-weight: 300;
`;

const SubTitle = styled.h3`
    font-family: 'Shippori Antique', serif;
    margin-top: -10px;
    font-weight: 300;
`;

const Message = styled.p`
    font-family: 'Shippori Antique', serif;
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
    color: #c7c7c7d2;
    margin-top: 3px;
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
