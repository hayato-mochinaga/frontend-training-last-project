import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import styled, { keyframes } from 'styled-components';

// ローダーのスタイル定義
const animateTheBodyBg = keyframes`
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(360deg);
  }
`;

const animateTheSpan = keyframes`
  0% {
    transform: scale(1);
  }
  80%,
  90% {
    transform: scale(0);
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  animation: ${animateTheBodyBg} 10s linear infinite;
  position: relative; // 追加
  height: 100%; // 追加
`;

const Loader = styled.div`
  position: relative;
  width: 10em; // ここを相対的なサイズに変更
  height: 10em; // ここを相対的なサイズに変更
`;

const LoaderSpan = styled.span<{ i: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(calc(1900deg * ${({ i }) => i})); // iに比例した回転角度を維持
  transform-origin: center center; // スピンの中心を維持

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 35.4%; // Spanのサイズを調整可能
    height: 2%; // Spanの高さを調整可能
    border-radius: 55%;
    background-color: #00ff0a;
    box-shadow: 0 0 10px #00ff0a,
                0 0 20px #00ff0a,
                0 0 30px #00ff0a,
                0 0 40px #00ff0a,
                0 0 60px #00ff0a,
                0 0 80px #00ff0a,
                0 0 100px #00ff0a;
    animation: ${animateTheSpan} 4s linear infinite calc(.1s * ${({ i }) => i});
  }
`;

const ChartContainer = styled.div`
  position: absolute; // LoaderWrapperの中で絶対位置
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%); // 中央に配置
  height: 100%;
  width: 100%; // Loaderサイズに合わせて調整可能
`;

// LoadingAnimationコンポーネント
const LoadingAnimation: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = echarts.init(chartRef.current);

            const option = {
                graphic: {
                    elements: [
                        {
                            type: 'text',
                            left: 'center',
                            top: 'center',
                            style: {
                                text: 'Loading',
                                fontSize: 30,
                                fontFamily: 'Nicomoji', // Nicomojiフォントを指定
                                fontWeight: '100',
                                lineDash: [0, 200],
                                lineDashOffset: 0,
                                fill: 'transparent',
                                stroke: '#91b5fd', // 白文字
                                lineWidth: 0.9,
                            },
                            keyframeAnimation: {
                                duration: 10000, // アニメーション全体の長さ
                                loop: true,
                                keyframes: [
                                    {
                                        percent: 0,
                                        style: {
                                            fill: 'transparent',
                                            lineDashOffset: 0,
                                            lineDash: [0, 200],
                                        },
                                    },
                                    {
                                        percent: 0.167,
                                        style: {
                                            fill: 'transparent',
                                            lineDashOffset: 200,
                                            lineDash: [200, 0],
                                        },
                                    },
                                    {
                                        percent: 0.333,
                                        style: {
                                            fill: 'transparent',
                                        },
                                    },
                                    {
                                        percent: 0.5,
                                        style: {
                                            fill: '#ffffffa8', // 白色でフィル
                                        },
                                    },
                                    {
                                        percent: 0.667,
                                        style: {
                                            fill: '#fffffff4',
                                            lineDashOffset: 200,
                                            lineDash: [200, 0]
                                        },
                                    },
                                    {
                                        percent: 0.833,
                                        style: {
                                            fill: 'transparent',
                                            lineDashOffset: 0,
                                            lineDash: [0, 200],
                                        },
                                    },
                                    {
                                        percent: 1,
                                        style: {
                                            fill: 'transparent',
                                            lineDashOffset: 0,
                                            lineDash: [0, 200],
                                        },
                                    },
                                ]

                            },
                        },
                    ],
                },
            };

            chart.setOption(option);

            // コンポーネントがアンマウントされるときにチャートを破棄
            return () => {
                chart.dispose();
            };
        }
    }, []);

    return (
        <LoaderWrapper>
            <ChartContainer ref={chartRef} />
            <Loader>
                {[...Array(20)].map((_, i) => (
                    <LoaderSpan key={i} i={i + 1} />
                ))}
            </Loader>
        </LoaderWrapper>
    );
};

export default LoadingAnimation;
