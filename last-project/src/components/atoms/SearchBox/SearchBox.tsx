import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

interface PrefectureOptionType {
    label: string;
    furigana: string;
    prefectureCode: string;
}

interface SearchBoxProps {
    options: PrefectureOptionType[];
    label: string;
    isGroup: boolean;
    name: string;
    onChange?: (value: string) => void;
}

const StyledAutocomplete = styled(Autocomplete)<{ hasError: boolean }>(({ hasError }) => ({
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiInputBase-root': {
        backgroundColor: '#0F1535',
        color: 'white',
        borderRadius: '16px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: hasError ? 'red' : '#E2E8F0',
        borderRadius: '16px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: hasError ? 'red' : '#E2E8F0',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: hasError ? 'red' : '#E2E8F0',
    },
    '& .MuiSvgIcon-root': {
        color: 'white',
    },
}));

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
    const [error, setError] = useState<string | null>(null);
    const { control } = useForm();

    const sortedOptions = options.sort((a, b) => {
        if (isGroup) {
            const aChar = normalizeCharacter(a.furigana.charAt(0));
            const bChar = normalizeCharacter(b.furigana.charAt(0));
            const aIndex = aiueoOrder.indexOf(aChar);
            const bIndex = aiueoOrder.indexOf(bChar);
            return aIndex - bIndex || a.furigana.localeCompare(b.furigana, 'ja-JP');
        } else {
            return a.label.localeCompare(b.label, 'ja-JP');
        }
    });

    const handleOptionValidation = (value: string) => {
        const isValid = sortedOptions.some(option => option.label === value);
        if (!isValid) {
            setError('選択肢に存在しない値です。');
        } else {
            setError(null);
        }
        return isValid;
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <>
                    <StyledAutocomplete
                        disablePortal
                        options={sortedOptions}
                        groupBy={isGroup ? (option) => normalizeCharacter(option.furigana.charAt(0)) : undefined}
                        getOptionLabel={(option) => option.label}
                        filterOptions={(options, state) =>
                            options.filter(option =>
                                (option.label && option.label.includes(state.inputValue ?? '')) ||
                                (option.furigana && option.furigana.includes(state.inputValue ?? ''))
                            )
                        }
                        freeSolo={false}  // オプションからの選択を強制する設定
                        sx={{ width: 270, height: 0 }}
                        inputValue={field.value}
                        onInputChange={(event, newInputValue) => {
                            field.onChange(newInputValue);
                            if (onChange) {
                                onChange(newInputValue);
                            }
                            handleOptionValidation(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={displayLabel}
                                onFocus={() => setDisplayLabel(label)} // フォーカス時にラベルを「都道府県名を選択」のままにする
                                onBlur={(event) => {
                                    const inputValue = event.target.value;

                                    if (!inputValue) {
                                        setDisplayLabel(label); // 空の時は「都道府県名を選択」に戻す
                                    } else if (!handleOptionValidation(inputValue)) {
                                        setDisplayLabel(label); // 無効な値なら「都道府県名を選択」に戻す
                                    } else {
                                        setDisplayLabel(label.slice(0, -3)); // 有効な値なら「都道府県名」にする
                                    }
                                }}
                                error={!!error}
                                helperText={error}
                            />
                        )}
                        value={field.value}
                        onChange={(event, newValue) => {
                            const newLabel = newValue?.label ?? '';
                            field.onChange(newLabel);
                            if (onChange) {
                                onChange(newLabel);
                            }
                            handleOptionValidation(newLabel);
                        }}
                        hasError={!!error} // バリデーションエラー時のスタイル適用
                    />
                </>
            )}
        />
    );
};

export default SearchBox;
