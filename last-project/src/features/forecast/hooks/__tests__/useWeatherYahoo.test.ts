import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import useWeatherYahoo from '../useWeatherYahoo';

// モック関数の設定
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// 共通のモックデータ
const mockWeatherData = {
    Feature: [
        {
            Name: 'Tokyo',
            Property: {
                WeatherList: {
                    Weather: [
                        { Date: '2024-08-23T00:00:00+09:00', Rainfall: 0.0 },
                        { Date: '2024-08-23T03:00:00+09:00', Rainfall: 1.2 },
                    ]
                }
            }
        }
    ]
};

describe('useWeatherYahoo', () => {
    afterEach(() => {
        jest.clearAllMocks(); // テストごとにモックをクリア
    });

    it('有効な緯度経度が指定された場合、天気データを正常に取得し返すべき', async () => {
        // モックの設定
        mockedAxios.get.mockResolvedValue({ data: mockWeatherData });

        // フックの実行
        const { result, waitForNextUpdate } = renderHook(() => useWeatherYahoo('35.6895', '139.6917'));

        // 非同期処理の完了を待機
        await waitForNextUpdate();

        // テスト結果の検証
        expect(result.current.weather).toEqual({
            Name: 'Tokyo',
            WeatherList: [
                { Date: '2024-08-23T00:00:00+09:00', Rainfall: 0.0 },
                { Date: '2024-08-23T03:00:00+09:00', Rainfall: 1.2 },
            ]
        });
        expect(result.current.error).toBeNull();
    });

    it('緯度または経度がnullの場合、APIコールを実行せず、結果はnullであるべき', async () => {
        const { result } = renderHook(() => useWeatherYahoo(null, '139.6917'));

        expect(result.current.weather).toBeNull();
        expect(result.current.error).toBeNull();

        expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('API呼び出しが失敗した場合、エラーメッセージが設定されるべき', async () => {
        // モックの設定
        mockedAxios.get.mockRejectedValue(new Error('API Error'));

        const { result, waitForNextUpdate } = renderHook(() => useWeatherYahoo('35.6895', '139.6917'));

        await waitForNextUpdate();

        expect(result.current.weather).toBeNull();
        expect(result.current.error).toBe('天気データの取得に失敗しました');
    });
});
