import React, { useEffect, useState } from 'react';
import { VerticalMenu } from '../components/molecules/Menu/VerticalMenu';
import { Outlet } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// フェードインアニメーション（ゆっくり）
const slowFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

// 深海のテーマに合うアニメーション
const deepSeaAppearance = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.947);
    filter: blur(5px);
  }
  100% {
    opacity: 0.9;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
`;

// コンテナ全体のスタイル
const LayoutContainer = styled.div`
    display: flex;
    height: 100vh;
    align-items: center;
`;

// コンテンツエリアのスタイル
const ContentContainer = styled.div<{ animate: boolean }>`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${({ animate }) => animate ? deepSeaAppearance : 'none'} 1.24s ease-out;
`;

// メニューのスタイル
const VerticalMenuContainer = styled.div<{ animate: boolean }>`
    opacity: 0; // 初期状態で非表示
    animation: ${({ animate }) => animate ? slowFadeIn : 'none'} 2s ease-in forwards; // アニメーション条件を指定

    // 画面幅が1030px未満の時に非表示にする
    @media (max-width: 1030px) {
        display: none;
    }
`;

const Layout: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <LayoutContainer>
      <VerticalMenuContainer animate={animate}>
        <VerticalMenu />
      </VerticalMenuContainer>
      <ContentContainer animate={animate}>
        <Outlet />
      </ContentContainer>
    </LayoutContainer>
  );
};

export default Layout;
