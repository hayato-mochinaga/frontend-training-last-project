import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Logo } from '../../atoms/Logo/Logo';

export const VerticalMenu: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };

        updateTime(); // 初回の即時更新
        const intervalId = setInterval(updateTime, 1000); // 1秒ごとに更新

        return () => clearInterval(intervalId); // コンポーネントがアンマウントされたらタイマーをクリア
    }, []);

    return (
        <MenuContainer>
            <LogoContainer>
                <Logo src="/public/static/media/logo.svg" width="75%" />
                <LogoLine />
                <TimeDisplay>
                    {currentTime.split(':')[0]}
                    <ColonBlink>:</ColonBlink> {/* 点滅するコロン */}
                    {currentTime.split(':')[1]}
                </TimeDisplay>
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
});

const LogoLine = styled('div')({
    width: '80%',
    height: '0.1%',
    background: '#fff',
    marginTop: '10px',
});

const TimeDisplay = styled('div')({
    marginTop: '2px',
    fontFamily: '"Orbitron", sans-serif',
    fontSize: '1.5rem',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
});

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
