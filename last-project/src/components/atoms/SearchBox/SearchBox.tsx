import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

interface PrefectureOptionType {
    label: string;
    firstLetter: string;
    furigana: string;
}

interface SearchBoxProps {
    options: PrefectureOptionType[];
    label: string;
    isGroup: boolean;
    name: string;
    onChange?: (value: string) => void;
}

const StyledAutocomplete = styled(Autocomplete<PrefectureOptionType>)({
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiInputBase-root': {
        backgroundColor: '#0F1535',
        color: 'white',
        borderRadius: '16px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#E2E8F0',
        borderRadius: '16px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#E2E8F0',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#E2E8F0',
    },
    '& .MuiSvgIcon-root': {
        color: 'white',
    },
});

const aiueoOrder = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわ';

const normalizeCharacter = (char: string) => {
    switch (char) {
        case 'が': return 'か';
        case 'ぎ': return 'き';
        case 'ぐ': return 'く';
        case 'げ': return 'け';
        case 'ご': return 'こ';
        case 'ざ': return 'さ';
        case 'じ': return 'し';
        case 'ず': return 'す';
        case 'ぜ': return 'せ';
        case 'ぞ': return 'そ';
        case 'だ': return 'た';
        case 'ぢ': return 'ち';
        case 'づ': return 'つ';
        case 'で': return 'て';
        case 'ど': return 'と';
        case 'ば': return 'は';
        case 'び': return 'ひ';
        case 'ぶ': return 'ふ';
        case 'べ': return 'へ';
        case 'ぼ': return 'ほ';
        case 'ぱ': return 'は';
        case 'ぴ': return 'ひ';
        case 'ぷ': return 'ふ';
        case 'ぺ': return 'へ';
        case 'ぽ': return 'ほ';
        default: return char;
    }
};

export const SearchBox: React.FC<SearchBoxProps> = ({ options, label, isGroup, name, onChange }) => {
    const [displayLabel, setDisplayLabel] = useState(label);
    const { control } = useForm();

    const sortedOptions = options.sort((a, b) => {
        if (isGroup) {
            const aChar = normalizeCharacter(a.firstLetter);
            const bChar = normalizeCharacter(b.firstLetter);
            const aIndex = aiueoOrder.indexOf(aChar);
            const bIndex = aiueoOrder.indexOf(bChar);
            return aIndex - bIndex || a.firstLetter.localeCompare(b.firstLetter, 'ja-JP');
        } else {
            return a.label.localeCompare(b.label, 'ja-JP');
        }
    });

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <StyledAutocomplete
                    disablePortal
                    options={sortedOptions}
                    groupBy={isGroup ? (option) => normalizeCharacter(option.firstLetter) : undefined}
                    getOptionLabel={(option) => option.label}
                    filterOptions={(options, state) =>
                        options.filter(option =>
                            (option.label && option.label.includes(state.inputValue ?? '')) ||
                            (option.furigana && option.furigana.includes(state.inputValue ?? ''))
                        )
                    }
                    sx={{ width: 270, height: 0 }}
                    inputValue={field.value}
                    onInputChange={(event, newInputValue) => {
                        field.onChange(newInputValue);
                        if (onChange) {
                            onChange(newInputValue);
                        }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={displayLabel}
                            onFocus={() => setDisplayLabel(label.slice(0, -3))}
                            onBlur={(event) => {
                                setDisplayLabel(label);
                                console.log('現在の入力値:', event.target.value);
                            }}
                        />
                    )}
                    value={field.value}
                    onChange={(event, newValue) => {
                        field.onChange(newValue?.label ?? '');
                        if (onChange) {
                            onChange(newValue?.label ?? '');
                        }
                    }}
                />
            )}
        />
    );
};

export default SearchBox;

