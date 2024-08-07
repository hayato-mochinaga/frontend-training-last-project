import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

interface SearchButtonProps {
    color?: string;
    size?: number;
    onClick?: () => void;
}

const StyledSearchIcon = styled(SearchIcon)<SearchButtonProps>(({ color = 'default', size }) => ({
    color,
    fontSize: size || 24,
}));

const StyledButton = styled('button')({
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
});

const SearchButton: React.FC<SearchButtonProps> = ({ size, color, onClick }) => {
    return (
        <StyledButton onClick={onClick}>
            <StyledSearchIcon color={color} size={size} />
        </StyledButton>
    );
};

export default SearchButton;
