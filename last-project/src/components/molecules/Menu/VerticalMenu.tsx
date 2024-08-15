import React from 'react';
import { styled } from '@mui/system';
import { Logo } from '../../atoms/Logo/Logo';



export const VerticalMenu: React.FC = () => {
    return (
        <MenuContainer>
            <LogoContainer>
                <Logo src="/public/static/media/logo.svg" width="75%" />
                <LogoLine />
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