import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBox from '../../atoms/SearchBox/SearchBox';
import SearchButton from '../../atoms/SearchButton/SearchButton';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

interface PrefectureOption {
    label: string;
    firstLetter: string;
    furigana: string;
}

interface PortOption extends PrefectureOption { }

interface SearchAreaProps {
    prefectureOptions: PrefectureOption[];
    prefectureLabel: string;
    portOptions: PortOption[];
    portLabel: string;
    onPrefectureChange: (prefecture: string) => void;
}

interface SearchInput {
    prefecture: string;
    port: string;
}

const SearchArea: React.FC<SearchAreaProps> = ({ prefectureOptions, prefectureLabel, portOptions, portLabel, onPrefectureChange }) => {
    const { control, handleSubmit } = useForm<SearchInput>();
    const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(null);

    const handlePrefectureChange = (value: string) => {
        setSelectedPrefecture(value);
        onPrefectureChange(value);
    };

    const onSubmit: SubmitHandler<SearchInput> = data => {
        console.log('Prefecture:', data.prefecture);
        console.log('Port:', data.port);
    };

    return (
            <form onSubmit={handleSubmit(onSubmit)}>
        <SearchAreaWrapper>
                <SearchBoxWrapper>
                    <Controller
                        name="prefecture"
                        control={control}
                        render={({ field }) => (
                            <StyledSearchBox
                                {...field}
                                options={prefectureOptions}
                                label={prefectureLabel}
                                isGroup={true}
                                onChange={(value: string) => {
                                    field.onChange(value);
                                    handlePrefectureChange(value);
                                }}
                            />
                        )}
                    />
                    {selectedPrefecture && (
                        <Controller
                            name="port"
                            control={control}
                            render={({ field }) => (
                                <StyledSearchBox
                                    {...field}
                                    options={portOptions}
                                    label={portLabel}
                                    isGroup={false}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    )}
                </SearchBoxWrapper>
                <StyledSearchButtonWrapper>
                    <StyledSearchButton color="white" size={35} />
                </StyledSearchButtonWrapper>
        </SearchAreaWrapper>
            </form>
    );
};

const SearchAreaWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    height: '10%',
    gap: '10px',
});

const SearchBoxWrapper = styled('div')({
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: '-55px',
    gap: '100px',
});

const StyledSearchButtonWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
});

const StyledSearchBox = styled(SearchBox)({
    height: '100%',
});

const StyledSearchButton = styled(SearchButton)({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
});

export default SearchArea;
