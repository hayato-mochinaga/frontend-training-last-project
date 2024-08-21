import { renderHook, waitFor } from '@testing-library/react'; // テストライブラリのフックレンダリングと非同期操作をサポートする関数をインポート
import axios from 'axios'; // HTTPリクエストを処理するためのaxiosライブラリをインポート
import useWindAndTemp from '../useWindAndTemp'; // テスト対象のカスタムフックをインポート

// axiosのモック化を設定
jest.mock('axios'); // jestを使用してaxiosをモック化し、テスト中に実際のHTTPリクエストが発生しないようにする
const mockedAxios = axios as jest.Mocked<typeof axios>; // モックされたaxiosを型キャストして扱う

describe('useWindAndTempのテスト', () => { // useWindAndTempフックのテストを記述する
    const mockLatitude = '35.6895';  // テストで使用するモック緯度データ
    const mockLongitude = '139.6917';  // テストで使用するモック経度データ
    const mockResponseData = { // モックのAPIレスポンスデータを定義
        hourly: { // hourlyキーの下にAPIから返されるデータを含む
            time: ['2024-08-21T00:00:00Z', '2024-08-21T01:00:00Z'],  // 時間データの配列
            temperature_2m: [25.3, 24.8],  // 2m高さの気温データの配列
            wind_speed_10m: [3.5, 3.1],  // 10m高さの風速データの配列
            wind_direction_10m: [180, 190],  // 10m高さの風向データの配列
            cloud_cover: [75, 80],  // 雲量データの配列
            rain: [0, 0.5],  // 降雨量データの配列
        },
    };

    // console.errorのモック設定
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {}); // console.errorをスパイし、エラーメッセージの出力をモック

    afterAll(() => { // すべてのテストが終了した後に実行される
        consoleErrorMock.mockRestore(); // console.errorのモックを解除し、元の状態に戻す
    });

    beforeEach(() => { // 各テストが実行される前に実行される
        jest.clearAllMocks();  // テストごとにモックの状態をクリアして初期化
    });

    it('緯度と経度が指定されたとき、風と気温のデータを取得して返す', async () => { // 正常にデータが取得されるケースをテスト
        mockedAxios.get.mockResolvedValueOnce({ data: mockResponseData }); // モックされたaxiosが正常なレスポンスを返すように設定

        const { result } = renderHook(() => // テスト対象のフックをレンダリングし、その結果を取得
            useWindAndTemp(mockLatitude, mockLongitude) // フックにモック緯度と経度を渡して呼び出す
        );

        expect(result.current.isLoading).toBe(true);  // フックがデータ取得中であることを示すフラグがtrueであることを確認

        await waitFor(() => { // 非同期データ取得が完了するのを待機
            expect(result.current.isLoading).toBe(false);  // データ取得完了後、フラグがfalseになることを確認
        });

        expect(result.current.error).toBeNull();  // エラーメッセージがnullであることを確認
        expect(result.current.windAndTempData).toEqual({ // フックが返すデータが期待通りであるか確認
            time: mockResponseData.hourly.time, // 時間データが一致しているかを確認
            temperature: mockResponseData.hourly.temperature_2m, // 気温データが一致しているかを確認
            windSpeed: mockResponseData.hourly.wind_speed_10m, // 風速データが一致しているかを確認
            windDirection: mockResponseData.hourly.wind_direction_10m, // 風向データが一致しているかを確認
            cloudCover: mockResponseData.hourly.cloud_cover, // 雲量データが一致しているかを確認
            rain: mockResponseData.hourly.rain, // 降雨量データが一致しているかを確認
        });

        expect(mockedAxios.get).toHaveBeenCalledTimes(1);  // axios.getが1回だけ呼び出されたことを確認
    });

    it('API呼び出しが失敗した場合、エラーが正しく処理される', async () => { // APIエラーの処理をテスト
        const errorMessage = new Error('APIエラー'); // テスト用のエラーメッセージを定義
        mockedAxios.get.mockRejectedValueOnce(errorMessage); // モックされたaxiosがエラーを返すように設定

        const { result } = renderHook(() => // テスト対象のフックをレンダリングし、その結果を取得
            useWindAndTemp(mockLatitude, mockLongitude) // フックにモック緯度と経度を渡して呼び出す
        );

        expect(result.current.isLoading).toBe(true);  // エラー発生前にデータ取得中であることを確認

        await waitFor(() => { // エラー処理が完了するのを待機
            expect(result.current.isLoading).toBe(false);  // データ取得失敗後、フラグがfalseになることを確認
        });

        expect(result.current.windAndTempData).toBeNull();  // エラー発生時、データがnullであることを確認
        expect(result.current.error).toBe('風速と気温のデータ取得に失敗しました');  // エラーメッセージが正しく設定されていることを確認

        expect(consoleErrorMock).toHaveBeenCalledWith('風速と気温のデータ取得中にエラーが発生しました', errorMessage); // console.errorに正しいエラーメッセージが出力されたか確認
        expect(mockedAxios.get).toHaveBeenCalledTimes(1);  // axios.getが1回だけ呼び出されたことを確認
    });

    it('緯度または経度がnullの場合、データ取得を行わない', async () => { // 無効な入力の場合の処理をテスト
        const { result } = renderHook(() => // テスト対象のフックをレンダリングし、その結果を取得
            useWindAndTemp(null, null) // フックにnullの緯度と経度を渡して呼び出す
        );

        expect(result.current.isLoading).toBe(false);  // 無効な入力ではデータ取得が開始されないことを確認
        expect(result.current.windAndTempData).toBeNull();  // データがnullであることを確認
        expect(result.current.error).toBeNull();  // エラーが発生していないことを確認

        expect(mockedAxios.get).not.toHaveBeenCalled();  // axios.getが呼び出されていないことを確認
    });
});
