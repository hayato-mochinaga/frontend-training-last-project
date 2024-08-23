import React from 'react';
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
  align-items: center; // 上下中央に配置
  animation: ${animateTheBodyBg} 5s linear infinite;
  position: fixed; // 固定位置
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); // 上下左右中央に配置
  height: 100%;
  width: 100%;
`;

const Loader = styled.div`
  position: relative;
  width: 14%;
  height: 14%;
`;

const LoaderSpan = styled.span<{ i: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(calc(1900deg * ${({ i }) => i}));
  transform-origin: center center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 11px;
    height: 18px;
    border-radius: 77px;
    background-color: #00ff0a;
    box-shadow: 0 0 1px #00ff0a,
                0 0 2px #00ff0a,
                0 0 3px #00ff0a,
                0 0 4px #00ff0a,
                0 0 6px #00ff0a,
                0 0 8px #00ff0a,
                0 0 10px #00ff0a;
    animation: ${animateTheSpan} 893ms linear infinite calc(.1s * ${({ i }) => i});
  }
`;

// LoadingAnimationコンポーネント
const LoadingAnimation: React.FC = () => {
    return (
        <LoaderWrapper>
            <Loader>
                {[...Array(20)].map((_, i) => (
                    <LoaderSpan key={i} i={i + 1} />
                ))}
            </Loader>
        </LoaderWrapper>
    );
};

export default LoadingAnimation;
