import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

interface SearchButtonProps {
    color?: string;
    size?: number;
    onClick?: () => void;
    shake?: boolean;
}

const StyledSearchIcon = styled(SearchIcon)<SearchButtonProps>(({ color = 'default', size }) => ({
    color,
    fontSize: size || 24,
}));

const StyledButton = styled('button')<SearchButtonProps>(({ shake }) => ({
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '50%',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    animation: shake ? 'shake 0.3s ease' : 'none',
    '&:hover': {
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    },
    '&:hover::after': {
        content: '""',
        position: 'absolute',
        width: '200%',
        height: '200%',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.3)',
        animation: 'ripple 0.78s linear infinite',
    },
    '&:focus': {
        outline: 'none', // フォーカス時の青と白の円形の線を削除
    },
    '&:active': {
        animation: 'bounce 0.3s ease', // クリック時のバウンドアニメーション
    },
    '@keyframes ripple': {
        from: {
            transform: 'scale(0)',
            opacity: 1,
        },
        to: {
            transform: 'scale(1)',
            opacity: 0,
        },
    },
    '@keyframes shake': {
        '0%, 100%': {
            transform: 'translateX(0)',
        },
        '25%': {
            transform: 'translateX(-5px)',
        },
        '50%': {
            transform: 'translateX(5px)',
        },
        '75%': {
            transform: 'translateX(-5px)',
        },
    },
    '@keyframes bounce': {
        '0%': {
            transform: 'scale(1)',
        },
        '50%': {
            transform: 'scale(0.9)',
        },
        '100%': {
            transform: 'scale(1)',
        },
    },
}));

const SearchButton: React.FC<SearchButtonProps> = ({ size, color, onClick, shake }) => {
    return (
        <StyledButton onClick={onClick} shake={shake}>
            <StyledSearchIcon color={color} size={size} />
        </StyledButton>
    );
};

export default SearchButton;
