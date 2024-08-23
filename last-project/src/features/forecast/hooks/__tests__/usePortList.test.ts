import { renderHook, act } from '@testing-library/react'; // @testing-library/reactからrenderHookとactをインポート
import axios from 'axios'; // HTTPリクエストを処理するためにaxiosをインポート
import usePortList from '../usePortList'; // テスト対象のカスタムフックusePortListをインポート

jest.mock('axios'); // axiosをモック化して、テスト中に実際のHTTPリクエストが行われないようにする

const mockedAxios = axios as jest.Mocked<typeof axios>; // モック化されたaxiosを型付け

describe('usePortListのテスト', () => { // usePortListフックのテストスイートを定義
  const location = 'Tokyo'; // テストで使用するモックの場所データ
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks(); // 各テストの前にモックの呼び出し履歴と状態をクリア
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {}); // console.errorをモックして抑制
  });

  afterEach(() => {
    consoleErrorMock.mockRestore(); // テスト後にconsole.errorのモックを元に戻す
  });

  it('正常に漁港名リストを取得する', async () => { // 正常にデータが取得されるケースをテスト
    const mockResponseData = {
      features: [
        { attributes: { 漁港名: 'Port A' } },
        { attributes: { 漁港名: 'Port B' } },
      ],
    }; // モックレスポンスデータを定義

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponseData }); // axios.getがモックレスポンスデータを返すように設定

    const { result } = renderHook(() => usePortList(location)); // usePortListフックをレンダリングして結果を取得

    await act(async () => {
      await result.current; // 非同期データの取得が完了するまで待機
    });

    expect(result.current.portList).toEqual([
      { portName: 'Port A' },
      { portName: 'Port B' },
    ]); // フックが返すポートリストが期待通りか確認
    expect(result.current.error).toBeNull(); // エラーが発生していないことを確認
  });

  it('APIのレスポンスが空の場合、空のポートリストが返される', async () => { // APIレスポンスが空のケースをテスト
    const mockResponseData = {
      features: [],
    }; // モックレスポンスデータが空のケースを定義

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponseData }); // axios.getが空のレスポンスを返すように設定

    const { result } = renderHook(() => usePortList(location)); // usePortListフックをレンダリングして結果を取得

    await act(async () => {
      await result.current; // 非同期データの取得が完了するまで待機
    });

    expect(result.current.portList).toEqual([]); // ポートリストが空であることを確認
    expect(result.current.error).toBeNull(); // エラーが発生していないことを確認
  });

  it('API呼び出しが失敗した場合、エラーメッセージが設定される', async () => { // API呼び出しが失敗するケースをテスト
    const mockError = new Error('Network Error'); // エラーメッセージをモック化
    mockedAxios.get.mockRejectedValueOnce(mockError); // axios.getがエラーを返すように設定

    const { result } = renderHook(() => usePortList(location)); // usePortListフックをレンダリングして結果を取得

    await act(async () => {
      await result.current; // 非同期データの取得が完了するまで待機
    });

    expect(result.current.portList).toEqual([]); // ポートリストが空であることを確認
    expect(result.current.error).toBe('漁港名の取得に失敗しました'); // エラーメッセージが正しく設定されていることを確認
  });
});
