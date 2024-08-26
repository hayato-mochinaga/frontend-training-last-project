import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBox from '../../atoms/SearchBox/SearchBox';
import SearchButton from '../../atoms/SearchButton/SearchButton';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface PrefectureOption {
    label: string;
    furigana: string;
    prefectureCode: string;
}

interface PortOption extends PrefectureOption { }

interface SearchAreaProps {
    prefectureOptions: PrefectureOption[];
    prefectureLabel: string;
    portOptions: PortOption[];
    portLabel: string;
    onPrefectureChange: (prefecture: string) => void;
    onSearch: (query: string) => void;
}

interface SearchInput {
    prefecture: string;
    port: string;
}

const SearchArea: React.FC<SearchAreaProps> = ({
    prefectureOptions,
    prefectureLabel,
    portOptions,
    portLabel,
    onPrefectureChange,
    onSearch
}) => {
    const { control, handleSubmit, setError, clearErrors } = useForm<SearchInput>();
    const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(null);
    const [shakeButton, setShakeButton] = useState<boolean>(false); // 追加: アニメーションのための状態

    const handlePrefectureChange = (value: string) => {
        setSelectedPrefecture(value);
        onPrefectureChange(value);
    };

    const validateOption = (value: string, options: { label: string }[]) => {
        return options.some(option => option.label === value);
    };

    const onSubmit: SubmitHandler<SearchInput> = async data => {
        const isPrefectureValid = validateOption(data.prefecture, prefectureOptions);
        const isPortValid = validateOption(data.port, portOptions);

        if (!isPrefectureValid) {
            setError('prefecture', { type: 'manual', message: '選択肢に存在しない都道府県です。' });
            setShakeButton(true); // 入力が正しくない場合にボタンを震えさせる
            setTimeout(() => setShakeButton(false), 300); // アニメーション後に状態をリセット
            return;
        }

        if (selectedPrefecture && !isPortValid) {
            setError('port', { type: 'manual', message: '選択肢に存在しない港です。' });
            setShakeButton(true); // 入力が正しくない場合にボタンを震えさせる
            setTimeout(() => setShakeButton(false), 300); // アニメーション後に状態をリセット
            return;
        }

        if (selectedPrefecture && !data.port) {
            setError('port', { type: 'manual', message: '漁港名を選択してください。' });
            setShakeButton(true); // 入力が正しくない場合にボタンを震えさせる
            setTimeout(() => setShakeButton(false), 300); // アニメーション後に状態をリセット
            return;
        }

        clearErrors();
        onSearch(`${data.prefecture}${data.port}`);
    };

    return (
        <FormArea>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SearchAreaWrapper>
                    <SearchBoxWrapper>
                        <Controller
                            name="prefecture"
                            control={control}
                            render={({ field, fieldState }) => (
                                <StyledSearchBox
                                    {...field}
                                    options={prefectureOptions}
                                    label={prefectureLabel}
                                    isGroup={true}
                                    onChange={(value: string) => {
                                        field.onChange(value);
                                        handlePrefectureChange(value);
                                    }}
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                        <PortSearchBoxWrapper>
                            {selectedPrefecture && (
                                <Controller
                                    name="port"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <StyledSearchBox
                                            {...field}
                                            options={portOptions}
                                            label={portLabel}
                                            isGroup={false}
                                            onChange={field.onChange}
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                        />
                                    )}
                                />
                            )}
                        </PortSearchBoxWrapper>
                    </SearchBoxWrapper>
                    <StyledSearchButtonWrapper>
                        <StyledSearchButton
                            color="white"
                            size={39}
                            shake={shakeButton} // 追加: アニメーションを制御するプロパティ
                            onClick={() => handleSubmit(onSubmit)()} // ボタンクリック時に送信をトリガー
                        />
                    </StyledSearchButtonWrapper>
                </SearchAreaWrapper>
            </form>
        </FormArea>
    );
};

const FormArea = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '10%',
});

const SearchAreaWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: '80px',
});

const SearchBoxWrapper = styled('div')({
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: '-55px',
    gap: '100px',
});

const PortSearchBoxWrapper = styled('div')({
    width: '270px',
});

const StyledSearchButtonWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
});

const StyledSearchBox = styled(SearchBox)({
    width: '270px',
    height: '100%',
});

const StyledSearchButton = styled(SearchButton)({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
});

export default SearchArea;
