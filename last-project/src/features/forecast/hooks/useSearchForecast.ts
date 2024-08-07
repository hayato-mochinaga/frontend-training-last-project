import { useForm, SubmitHandler } from 'react-hook-form';

interface SearchInput {
    prefecture: string;
    port: string;
}

const useSearchForecast = () => {
    const { control, handleSubmit } = useForm<SearchInput>();
    const onSubmit: SubmitHandler<SearchInput> = data => {
        console.log('Prefecture:', data.prefecture);
        console.log('Port:', data.port);
    };

    return {
        control,
        handleSubmit,
        onSubmit,
    };
};

export default useSearchForecast;
