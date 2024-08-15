import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Start: React.FC = () => {
    const navigate = useNavigate();
    const [text, setText] = useState('Anglers');
    const [fadeOut, setFadeOut] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const [showCasting, setShowCasting] = useState(false);
    const [finalFadeOut, setFinalFadeOut] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setFadeOut(true);
        }, 2000); // Anglersがフェードアウト

        const timer2 = setTimeout(() => {
            setText('Fishing');
            setFadeOut(false);
        }, 3000); // Fishingがフェードイン

        const timer3 = setTimeout(() => {
            setFadeOut(true);
        }, 5000); // Fishingがフェードアウト

        const timer4 = setTimeout(() => {
            setText('Casting');
            setFadeOut(false);
            setShowCasting(true);
        }, 6000); // Castingがフェードイン

        const timer5 = setTimeout(() => {
            setFinalFadeOut(true); // 最後の全体フェードアウトを開始
        }, 8000); // Casting表示後2秒後に全体フェードアウト開始

        const timer6 = setTimeout(() => {
            setShowLogo(true);
        }, 10000); // フェードアウト完了後にロゴをフェードイン開始

        const timer7 = setTimeout(() => {
            navigate('/');
        }, 18000); // ロゴアニメーションが完全に終了した後にリダイレクト

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
            overflow: 'hidden', // 背景アニメーション用にオーバーフローを隠す
        }}>
            {!showLogo && ( // ロゴ表示前にテキストを表示
                <div style={{
                    display: 'flex',
                    color: 'white',
                    fontSize: '3.4rem',
                    fontFamily: 'Josefin Sans, sans-serif',
                    fontStyle: 'italic',
                    fontWeight: 600,
                    marginRight: '4rem',
                    zIndex: 1,
                    opacity: finalFadeOut ? 0 : 1, // 最後のフェードアウトを反映
                    transition: 'opacity 2s ease-in-out', // フェードアウトアニメーションを2秒に設定
                }}>
                    <div style={{ marginRight: '0.5rem' }}>Forecast</div>
                    <div style={{ marginRight: '0.5rem' }}>for</div>
                    <div
                        style={{
                            width: '120px', // Anglers, Fishing, Castingの最大幅に合わせて固定
                            textAlign: 'left',
                            transform: fadeOut ? 'translateX(50px)' : 'translateX(0)',
                            transition: 'transform 1s ease-in-out, opacity 1s ease-in-out', // フェードアウトとスライドインを同時に適用
                            opacity: fadeOut && (text === 'Anglers' || text === 'Fishing') ? 0 : 1, // AnglersとFishingの切り替わり時のみフェードアウト
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {text}
                    </div>
                </div>
            )}
            {showLogo && (
                <div className="drop-container">
                    <div className="drop"></div>
                    <div className="wave"></div>
                    <img
                        src="../public/static/media/logo.svg"
                        alt="Logo"
                        className="logo"
                    />
                </div>
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

                    body {
                        overflow: hidden;
                        background: rgb(25,35,125);
                    }

                    .drop-container {
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        margin: auto;
                        height: 200px;
                        width: 200px;
                    }

                    .drop {
                        position: absolute;
                        top: -25%;
                        width: 100%;
                        height: 100%;
                        border-radius: 100% 5% 100% 100%;
                        transform: rotate(-45deg);
                        margin: 0px;
                        background: #005eff;
                        opacity: 0; /* 初期状態を非表示に設定 */
                        animation: drip 4s forwards, fadeInDrop 1.5s forwards; /* フェードインとドリップのアニメーション */
                    }

                    .wave {
                        position: absolute;
                        opacity: 0;
                        top: 75%; /* 波紋の位置調整 */
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 2px;
                        height: 1px;
                        border: #ffffffe7 7px solid;
                        border-radius: 300px / 150px;
                        animation: ripple 2s ease-out 4s forwards; /* 波紋のアニメーション、0.4秒遅延 */
                    }

                    .logo {
                        position: absolute;
                        top: 0; left: 0; right: 0; bottom: 0;
                        margin: auto;
                        width: 200px;
                        height: 200px;
                        opacity: 0;
                        animation: appear 2s 4s forwards; // アニメーション時間を調整
                    }

                    @keyframes fadeInDrop {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }

                    @keyframes appear {
                        0% {
                            opacity: 0;
                        }
                        100% {
                            opacity: 1;
                        }
                    }

                    @keyframes ripple {
                        from {
                            opacity: 1;
                        }
                        to {
                            width: 600px;
                            height: 300px;
                            border-width: 1px;
                            opacity: 0;
                        }
                    }

                    @keyframes drip {
                        45% {
                            top: 0;
                            border-radius: 100% 5% 100% 100%;
                            transform: rotate(-45deg);
                        }
                        100% {
                            top: 0;
                            transform: rotate(0deg);
                            border-radius: 100%;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Start;
