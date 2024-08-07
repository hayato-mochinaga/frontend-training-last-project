import React from 'react';
import { VerticalMenu } from '../components/molecules/Menu/VerticalMenu';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

const LayoutContainer = styled('div')({
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
});

const ContentContainer = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const Layout: React.FC = () => {
    return (
        <>
            <LayoutContainer>
                <VerticalMenu />
                <ContentContainer>

                <Outlet />
                </ContentContainer>
            </LayoutContainer>
        </>
    );
};

export default Layout;
