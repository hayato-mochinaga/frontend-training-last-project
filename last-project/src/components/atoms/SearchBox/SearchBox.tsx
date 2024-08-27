import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ports } from '../../../features/forecast/constants'; // portsをインポート

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

const markPortName = (label: string) => {
    const isMarkedPort = ports.some(port => port.portName === label);
    return isMarkedPort ? `${label} (🌒潮汐グラフ対応)` : label; // ラベルに「(潮汐グラフ対応漁港)」を追加
};

export const SearchBox: React.FC<SearchBoxProps> = ({ options, label, isGroup, name, onChange }) => {
    const [displayLabel, setDisplayLabel] = useState(label);
    const [error, setError] = useState<string | null>(null);
    const { control } = useForm();

    const sortedOptions = options.map(option => ({
        ...option,
        displayLabel: markPortName(option.label), // 表示用のlabelに「(潮汐グラフ対応漁港)」を追加
        originalLabel: option.label // 元のlabelを保持
    })).sort((a, b) => {
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
        // 「(潮汐グラフ対応漁港)」を除去してからバリデーションを行う
        const normalizedValue = value.replace(' (🌒潮汐グラフ対応)', '');
        const isValid = sortedOptions.some(option => option.originalLabel === normalizedValue); // originalLabelでバリデーション
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
                        getOptionLabel={(option) => option.displayLabel} // 表示用のlabelを使う
                        filterOptions={(options, state) =>
                            options.filter(option =>
                                (option.displayLabel && option.displayLabel.includes(state.inputValue ?? '')) ||
                                (option.furigana && option.furigana.includes(state.inputValue ?? ''))
                            )
                        }
                        freeSolo={false}
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
                                onFocus={() => setDisplayLabel(label)}
                                onBlur={(event) => {
                                    const inputValue = event.target.value;
                                    if (!inputValue) {
                                        setDisplayLabel(label);
                                    } else if (!handleOptionValidation(inputValue)) {
                                        setDisplayLabel(label);
                                    } else {
                                        setDisplayLabel(label.slice(0, -3));
                                    }
                                }}
                                error={!!error}
                                helperText={error}
                            />
                        )}
                        value={field.value}
                        onChange={(event, newValue) => {
                            const newLabel = newValue?.originalLabel ?? ''; // originalLabelを使用
                            field.onChange(newLabel);
                            if (onChange) {
                                onChange(newLabel);
                            }
                            handleOptionValidation(newLabel);
                        }}
                        hasError={!!error}
                    />
                </>
            )}
        />
    );
};

export default SearchBox;
