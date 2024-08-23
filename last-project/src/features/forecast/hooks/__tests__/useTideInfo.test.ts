import { renderHook } from '@testing-library/react-hooks'; // Reactフックをテストするための関数をインポート
import axios from 'axios'; // HTTPリクエストを送信するためのライブラリをインポート
import useTideInfo from '../useTideInfo'; // テスト対象のカスタムフックをインポート

jest.mock('axios'); // axiosをモック化して、テスト中に実際のリクエストが発生しないようにする
const mockedAxios = axios as jest.Mocked<typeof axios>; // モック化されたaxiosの型を指定

describe('useTideInfoフックのテスト', () => { // useTideInfoフックをテストするためのテストスイートを定義
    const mockQuery = '0101,JP'; // テストで使用するクエリ文字列（ポートコードと都道府県コード）
    
    // モックとして使用するレスポンスデータ（正常なレスポンスをシミュレート）
    const mockResponseData = { 
        tide: {
            chart: {
                '2024-08-23': { // テストで使用する日付データ
                    sun: {
                        astro_twilight: ['04:00', '22:00'], // 太陽の天文薄明時刻
                        regular_twilight: ['05:00', '21:00'], // 太陽の通常薄明時刻
                        rise: '06:00', // 日の出時刻
                        midline: '12:00', // 南中時刻（太陽が最も高くなる時刻）
                        set: '18:00' // 日没時刻
                    },
                    moon: {
                        brightness: '75%', // 月の輝度（百分率）
                        age: '10', // 月齢
                        title: 'Waxing Gibbous', // 月相の名称
                        rise: '14:00', // 月の出時刻
                        midline: '20:00', // 月の南中時刻
                        set: '02:00' // 月の入り時刻
                    },
                    edd: [{ time: '07:00', unix: 1629730800, cm: 100 }], // 干潮データ
                    flood: [{ time: '13:00', unix: 1629752400, cm: 150 }], // 満潮データ
                    tide: [{ time: '19:00', unix: 1629774000, cm: 50 }] // 潮のデータ
                }
            }
        }
    };

    // モックとして使用するレスポンスデータ（検索結果が空の場合をシミュレート）
    const mockEmptyResponseData = { 
        tide: {
            chart: {}
        }
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

    it('有効なクエリに対して正しい潮汐情報を取得できる', async () => { // 正常なクエリに対して期待通りの潮汐情報が返されることをテスト
        mockedAxios.get.mockResolvedValueOnce({ data: mockResponseData }); // モックされたaxios.getが正常なレスポンスを返すように設定

        const { result } = renderHook(() => useTideInfo(mockQuery)); // useTideInfoフックをレンダリングして結果を取得

        const tideInfo = await result.current; // フックから返された潮汐情報を取得

        expect(tideInfo).toEqual({ // 返された潮汐情報が期待通りであることを検証
            sun: mockResponseData.tide.chart['2024-08-23'].sun,
            moon: mockResponseData.tide.chart['2024-08-23'].moon,
            edd: mockResponseData.tide.chart['2024-08-23'].edd,
            flood: mockResponseData.tide.chart['2024-08-23'].flood,
            tide: mockResponseData.tide.chart['2024-08-23'].tide
        });

        expect(mockedAxios.get).toHaveBeenCalledTimes(1); // axios.getが1回だけ呼び出されたことを確認
    });

    it('結果が見つからない場合、適切なエラーメッセージをログに出力し、エラーメッセージを返す', async () => { // 結果が見つからない場合にエラーメッセージが返され、適切なエラーメッセージがログに表示されることをテスト
        mockedAxios.get.mockResolvedValueOnce({ data: mockEmptyResponseData }); // モックされたaxios.getが空のレスポンスを返すように設定

        const { result } = renderHook(() => useTideInfo(mockQuery)); // useTideInfoフックをレンダリングして結果を取得

        const tideInfo = await result.current; // フックから返された潮汐情報を取得

        expect(tideInfo).toBe('潮汐情報が見つかりませんでした。'); // 返されたデータがエラーメッセージであることを確認
        expect(consoleErrorMock).toHaveBeenCalledWith('潮汐情報が見つかりませんでした:', '2024-08-23'); // エラーメッセージがログに表示されたことを確認
        expect(mockedAxios.get).toHaveBeenCalledTimes(1); // axios.getが1回だけ呼び出されたことを確認
    });

    it('API呼び出しが失敗した場合、適切なエラーメッセージをログに出力し、エラーメッセージを返す', async () => { // API呼び出しが失敗した場合にエラーメッセージが返され、エラーメッセージがログに表示されることをテスト
        const error = new Error('Network Error'); // ネットワークエラーオブジェクトを作成
        mockedAxios.get.mockRejectedValueOnce(error); // モックされたaxios.getがエラーを返すように設定

        const { result } = renderHook(() => useTideInfo(mockQuery)); // useTideInfoフックをレンダリングして結果を取得

        const tideInfo = await result.current; // フックから返された潮汐情報を取得

        expect(tideInfo).toBe('潮汐情報の取得に失敗しました。'); // 返されたデータがエラーメッセージであることを確認
        expect(consoleErrorMock).toHaveBeenCalledWith('潮汐情報の取得に失敗しました:', error); // エラーメッセージがログに表示されたことを確認
        expect(mockedAxios.get).toHaveBeenCalledTimes(1); // axios.getが1回だけ呼び出されたことを確認
    });
});
