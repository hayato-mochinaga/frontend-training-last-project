import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Logo } from '../../atoms/Logo/Logo';

export const VerticalMenu: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string>('');
    const [currentDate, setCurrentDate] = useState<string>(''); // 現在の日付用のstateを追加
    const [isHovered, setIsHovered] = useState<boolean>(false); // マウスオーバーの状態を管理するstateを追加

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const date = `${now.getMonth() + 1}/${now.getDate()}`; // 日付をMM/DD形式で取得
            setCurrentTime(`${hours}:${minutes}`);
            setCurrentDate(date); // 現在の日付をセット
        };

        updateTime(); // 初回の即時更新
        const intervalId = setInterval(updateTime, 1000); // 1秒ごとに更新

        return () => clearInterval(intervalId); // コンポーネントがアンマウントされたらタイマーをクリア
    }, []);

    const handleLogoClick = () => {
        window.location.href = '/'; // ロゴをクリックしたときに現在のページを再度アクセス
    };

    const handleMouseOver = () => setIsHovered(true); // マウスオーバー時にstateをtrueに
    const handleMouseOut = () => setIsHovered(false); // マウスアウト時にstateをfalseに

    return (
        <MenuContainer>
            <LogoContainer
                onClick={handleLogoClick}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <Logo src="/public/static/media/logo.svg" width="75%" />
                <LogoLine />
                <DateTimeContainer isHovered={isHovered}>
                    <DateDisplay isHovered={isHovered}>{currentDate}</DateDisplay> {/* 日付を表示 */}
                    <TimeDisplay isHovered={isHovered}>
                        {currentTime.split(':')[0]}
                        <ColonBlink>:</ColonBlink> {/* 点滅するコロン */}
                        {currentTime.split(':')[1]}
                    </TimeDisplay>
                </DateTimeContainer>
            </LogoContainer>
        </MenuContainer>
    );
};

const MenuContainer = styled('div')({
    width: '100%',
    height: '97vh',
    background: 'linear-gradient(135deg, #00010357 0%, #1d245067 100%)',
    borderRadius: '20px',
    marginLeft: '0.9%',
    minWidth: '260px',
});

const LogoContainer = styled('div')({
    width: '100%',
    height: '12%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer', // クリック可能であることを示すためにカーソルをポインタに変更
});

const LogoLine = styled('div')({
    width: '80%',
    height: '0.1%',
    background: '#fff',
    marginTop: '10px',
});

const DateTimeContainer = styled('div')<{
    isHovered: boolean;
}>(({ isHovered }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: isHovered ? 'row' : 'column', // マウスオーバー時に横並びにする
    justifyContent: 'center',
    transition: 'flex-direction 0.3s', // トランジションを追加
    position: 'relative', // 親要素に対する位置を保持
}));

const DateDisplay = styled('div')<{
    isHovered: boolean;
}>(({ isHovered }) => ({
    fontFamily: '"Orbitron", sans-serif',
    fontSize: '1.5rem',
    color: '#fff',
    opacity: isHovered ? 1 : 0, // マウスオーバー時に表示
    transform: isHovered ? 'translateY(0)' : 'translateY(-20px)', // 上から出現するアニメーション
    transition: 'opacity 0.3s, transform 0.3s', // アニメーションのトランジション
    marginRight: isHovered ? '10px' : '0', // 時刻との間に余白を追加（マウスオーバー時のみ）
    position: isHovered ? 'relative' : 'absolute', // 通常時は絶対位置で隠す
    top: isHovered ? '0' : '-20px', // 通常時は時刻の上に隠す
}));

const TimeDisplay = styled('div')<{
    isHovered: boolean;
}>(({ isHovered }) => ({
    fontFamily: '"Orbitron", sans-serif',
    fontSize: '1.5rem',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    transform: isHovered ? 'translateX(10px)' : 'translateX(0)', // 右にずれるアニメーション
    transition: 'transform 0.3s', // アニメーションのトランジション
    marginTop: '2px', // 初期状態の時刻位置を維持
}));

const ColonBlink = styled('span')({
    animation: 'blink 2s step-start infinite',
    '@keyframes blink': {
        '0%, 100%': {
            opacity: 1,
        },
        '50%': {
            opacity: 0,
        },
    },
});

export default VerticalMenu;
