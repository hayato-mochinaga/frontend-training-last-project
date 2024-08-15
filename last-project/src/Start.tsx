import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Start: React.FC = () => {
    const navigate = useNavigate();
    const [text, setText] = useState('Anglers');
    const [fadeOut, setFadeOut] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const [fadeOutComplete, setFadeOutComplete] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setFadeOut(true);
        }, 2000); // 2秒後にフェードアウト開始

        const timer2 = setTimeout(() => {
            setText('Fishing');
            setFadeOut(false);
        }, 3000); // 3秒後にテキスト変更とスライドイン開始

        const timer3 = setTimeout(() => {
            setFadeOut(true);
        }, 5000); // 2秒後に再度フェードアウト開始

        const timer4 = setTimeout(() => {
            setText('Casting');
            setFadeOut(false);
        }, 6000); // 1秒後に再度テキスト変更とスライドイン開始

        const timer5 = setTimeout(() => {
            setFadeOut(true);
            setFadeOutComplete(true); // フェードアウトが完了したことを示すフラグを設定
        }, 7500); // ロゴ表示前にテキストをフェードアウト

        const timer6 = setTimeout(() => {
            setShowLogo(true);
        }, 8000); // テキストのフェードアウト後にロゴをフェードイン開始

        const timer7 = setTimeout(() => {
            navigate('/');
        }, 11000); // ロゴ表示から3秒後にリダイレクト

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
            clearTimeout(timer6);
            clearTimeout(timer7);
        };
    }, [navigate]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'black',
            position: 'relative',
        }}>
            {!fadeOutComplete && ( // フェードアウト完了後にテキスト全体を非表示にする
                <div style={{
                    display: 'flex',
                    color: 'white',
                    fontSize: '3.4rem',
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontStyle: 'italic',
                    fontWeight: 600,
                    marginRight: '4rem',
                    zIndex: showLogo ? 0 : 1, // ロゴが上に表示されるように調整
                }}>
                    <div style={{ marginRight: '0.5rem' }}>Forecast</div>
                    <div style={{ marginRight: '0.5rem' }}>for</div>
                    <div
                        style={{
                            width: '120px', // Anglers, Fishing, Castingの最大幅に合わせて固定
                            textAlign: 'left',
                            opacity: fadeOut ? 0 : 1,
                            transform: fadeOut ? 'translateX(50px)' : 'translateX(0)',
                            transition: 'opacity 1s ease-in-out, transform 1s ease-in-out',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {text}
                    </div>
                </div>
            )}
            {showLogo && (
                <img
                    src="../public/static/media/logo.svg"
                    alt="Logo"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 0,
                        animation: 'fadeIn 2s forwards', // フェードインアニメーション
                        zIndex: 2,
                        width: '200px', // ロゴの大きさを調整
                        height: '200px',
                    }}
                />
            )}
            <style>
                {`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Start;
