import { renderHook } from '@testing-library/react-hooks'; // Reactフックをテストするための関数をインポート
import axios from 'axios'; // HTTPリクエストを送信するためのライブラリをインポート
import useGeocoder from '../useGeocoder'; // テスト対象のカスタムフックをインポート

jest.mock('axios'); // axiosをモック化して、テスト中に実際のリクエストを発生させないようにする
const mockedAxios = axios as jest.Mocked<typeof axios>; // モック化されたaxiosの型を指定

describe('useGeocoderフックのテスト', () => { // useGeocoderフックをテストするためのテストスイートを定義
    const mockQuery = '東京都千代田区'; // テストで使用するクエリ文字列
    const validCoordinates = '139.753595,35.693754'; // 正常な座標データ
    const invalidCoordinates = 'invalid_coordinates'; // 無効な座標データ

    const mockResponseData = { // 正常なレスポンスデータをモック
        Feature: [
            {
                Name: '東京都千代田区', // 地点名
                Geometry: {
                    Coordinates: validCoordinates, // 正常な座標データ
                    BoundingBox: '139.750595,35.690754,139.756595,35.696754' // 座標の境界ボックス
                }
            }
        ]
    };

    const mockEmptyResponseData = { // 検索結果が空の場合のレスポンスデータをモック
        Feature: []
    };

    const mockInvalidStructureResponseData = { // 不正な構造を持つレスポンスデータ
        InvalidFeature: [] // 正しいキーが存在しない構造
    };

    const mockInvalidCoordinatesResponseData = { // 無効な座標データを持つレスポンスデータをモック
        Feature: [
            {
                Name: '東京都千代田区', // 地点名
                Geometry: {
                    Coordinates: invalidCoordinates, // 無効な座標データ
                    BoundingBox: '139.750595,35.690754,139.756595,35.696754' // 正常な境界ボックス
                }
            }
        ]
    };

    let consoleErrorMock: jest.SpyInstance; // console.errorの呼び出しをモック化して監視

    beforeAll(() => { // 全テストケースの実行前に一度だけ実行される処理
        consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {}); // console.errorをモック化し、テスト中にエラーメッセージが実際に表示されないようにする
    });

    afterAll(() => { // 全テストケースの終了後に一度だけ実行される処理
        consoleErrorMock.mockRestore(); // console.errorのモック設定を解除し、元の状態に戻す
    });

    beforeEach(() => { // 各テストケースの実行前に毎回実行される処理
        jest.clearAllMocks(); // 全てのモックの呼び出し履歴や状態をリセットする
        consoleErrorMock.mockClear(); // console.errorの呼び出し履歴をクリア
    });

    it('有効なクエリに対して正しい位置情報を取得できる', async () => { // 正常なクエリに対して期待通りの位置情報が返されることをテスト
        mockedAxios.get.mockResolvedValueOnce({ data: mockResponseData }); // モックされたaxios.getが正常なレスポンスを返すように設定

        const { result } = renderHook(() => useGeocoder()); // useGeocoderフックをレンダリングして結果を取得
        const geocode = result.current; // フックから返されたgeocode関数を取得

        const locationData = await geocode(mockQuery); // geocode関数を呼び出し、モッククエリで位置情報を取得

        expect(locationData).toEqual({ // 返された位置情報が期待通りであることを検証
            Name: '東京都千代田区', // 期待される地点名
            Latitude: '35.693754', // 期待される緯度
            Longitude: '139.753595', // 期待される経度
            BoundingBox: '139.750595,35.690754,139.756595,35.696754' // 期待される境界ボックス
        });

        expect(mockedAxios.get).toHaveBeenCalledTimes(1); // axios.getが1回だけ呼び出されたことを確認
        expect(mockedAxios.get).toHaveBeenCalledWith('/api/geocode/V1/geoCoder', { // axios.getが正しい引数で呼び出されたことを確認
            params: {
                appid: 'dj00aiZpPWNibUhRUmI4QU5mcSZzPWNvbnN1bWVyc2VjcmV0Jng9YWE-', // 使用するAPIキー
                query: mockQuery, // 使用するクエリ
                output: 'json' // レスポンス形式をJSONに指定
            }
        });
    });

    it('結果が見つからない場合、nullを返し適切なエラーメッセージをログに出力する', async () => { // 結果が見つからない場合にnullが返され、適切なエラーメッセージがログに表示されることをテスト
        mockedAxios.get.mockResolvedValueOnce({ data: mockEmptyResponseData }); // モックされたaxios.getが空のレスポンスを返すように設定

        const { result } = renderHook(() => useGeocoder()); // useGeocoderフックをレンダリングして結果を取得
        const geocode = result.current; // フックから返されたgeocode関数を取得

        const locationData = await geocode(mockQuery); // geocode関数を呼び出し、モッククエリで位置情報を取得

        expect(locationData).toBeNull(); // 返されたデータがnullであることを確認
        expect(consoleErrorMock).toHaveBeenCalledWith('No results found'); // 'No results found'エラーメッセージがログに表示されたことを確認
        expect(mockedAxios.get).toHaveBeenCalledTimes(1); // axios.getが1回だけ呼び出されたことを確認
    });

    it('API呼び出しが失敗した場合、nullを返しエラーメッセージをログに出力する', async () => { // API呼び出しが失敗した場合にnullが返され、エラーメッセージがログに表示されることをテスト
        const error = new Error('Network Error'); // ネットワークエラーオブジェクトを作成
        mockedAxios.get.mockRejectedValueOnce(error); // モックされたaxios.getがエラーを返すように設定

        const { result } = renderHook(() => useGeocoder()); // useGeocoderフックをレンダリングして結果を取得
        const geocode = result.current; // フックから返されたgeocode関数を取得

        const locationData = await geocode(mockQuery); // geocode関数を呼び出し、モッククエリで位置情報を取得

        expect(locationData).toBeNull(); // 返されたデータがnullであることを確認
        expect(consoleErrorMock).toHaveBeenCalledWith('Error fetching geocode data', error); // 'Error fetching geocode data'エラーメッセージがログに表示されたことを確認
        expect(mockedAxios.get).toHaveBeenCalledTimes(1); // axios.getが1回だけ呼び出されたことを確認
    });

    it('レスポンス構造が不正な場合、nullを返しエラーメッセージをログに出力する', async () => { // レスポンス構造が不正な場合にnullが返され、エラーメッセージがログに表示されることをテスト
        mockedAxios.get.mockResolvedValueOnce({ data: mockInvalidStructureResponseData }); // モックされたaxios.getが不正な構造のレスポンスを返すように設定

        const { result } = renderHook(() => useGeocoder()); // useGeocoderフックをレンダリングして結果を取得
        const geocode = result.current; // フックから返されたgeocode関数を取得

        const locationData = await geocode(mockQuery); // geocode関数を呼び出し、モッククエリで位置情報を取得

        expect(locationData).toBeNull(); // 返されたデータがnullであることを確認
        expect(consoleErrorMock).toHaveBeenCalledWith('No results found'); // 'No results found'エラーメッセージがログに表示されたことを確認
        expect(mockedAxios.get).toHaveBeenCalledTimes(1); // axios.getが1回だけ呼び出されたことを確認
    });

    it('座標形式が不正な場合、nullを返しエラーメッセージをログに出力する', async () => { // 無効な座標データが返された場合にnullが返され、エラーメッセージがログに表示されることをテスト
        mockedAxios.get.mockResolvedValueOnce({ data: mockInvalidCoordinatesResponseData }); // モックされたaxios.getが無効な座標データのレスポンスを返すように設定

        const { result } = renderHook(() => useGeocoder()); // useGeocoderフックをレンダリングして結果を取得
        const geocode = result.current; // フックから返されたgeocode関数を取得

        const locationData = await geocode(mockQuery); // geocode関数を呼び出し、モッククエリで位置情報を取得

        expect(locationData).toBeNull(); // 返されたデータがnullであることを確認
        expect(consoleErrorMock).toHaveBeenCalledWith('Invalid coordinates format'); // 'Invalid coordinates format'エラーメッセージがログに表示されたことを確認
        expect(mockedAxios.get).toHaveBeenCalledTimes(1); // axios.getが1回だけ呼び出されたことを確認
    });

    it('クエリが空文字列の場合、nullを返しエラーメッセージをログに出力する', async () => { // クエリが空文字列の場合にnullが返され、エラーメッセージがログに表示されることをテスト
        const { result } = renderHook(() => useGeocoder()); // useGeocoderフックをレンダリングして結果を取得
        const geocode = result.current; // フックから返されたgeocode関数を取得

        const locationData = await geocode(''); // 空文字列のクエリでgeocode関数を呼び出し、位置情報を取得

        expect(locationData).toBeNull(); // 返されたデータがnullであることを確認
        expect(consoleErrorMock).toHaveBeenCalledWith('Query string is empty'); // 'Query string is empty'エラーメッセージがログに表示されたことを確認
        expect(mockedAxios.get).not.toHaveBeenCalled(); // 空文字列の場合、axios.getが呼び出されていないことを確認
    });

    it('クエリがnullの場合、nullを返しエラーメッセージをログに出力する', async () => { // クエリがnullの場合にnullが返され、エラーメッセージがログに表示されることをテスト
        const { result } = renderHook(() => useGeocoder()); // useGeocoderフックをレンダリングして結果を取得
        const geocode = result.current; // フックから返されたgeocode関数を取得

        const locationData = await geocode(null); // nullのクエリでgeocode関数を呼び出し、位置情報を取得

        expect(locationData).toBeNull(); // 返されたデータがnullであることを確認
        expect(consoleErrorMock).toHaveBeenCalledWith('Query string is null or undefined'); // 'Query string is null or undefined'エラーメッセージがログに表示されたことを確認
        expect(mockedAxios.get).not.toHaveBeenCalled(); // nullの場合、axios.getが呼び出されていないことを確認
    });
});
