import { renderHook } from '@testing-library/react'; // @testing-library/reactからrenderHookをインポート
import usePortAutoComplete from '../usePortAutoComplete'; // テスト対象のカスタムフックusePortAutoCompleteをインポート
import usePortList from '../usePortList'; // ポートリストを取得するカスタムフックusePortListをインポート
import useTidePortList from '../useTidePortList'; // 潮汐ポートリストを取得するカスタムフックuseTidePortListをインポート

// Port型の定義（portNameプロパティを持つオブジェクト）
interface Port {
  portName: string;
}

jest.mock('../usePortList'); // usePortListフックをモック化して、実際のデータ取得をシミュレート
jest.mock('../useTidePortList'); // useTidePortListフックをモック化して、実際のデータ取得をシミュレート

const mockUsePortList = usePortList as jest.MockedFunction<typeof usePortList>; // モック化されたusePortListフックの型を定義
const mockUseTidePortList = useTidePortList as jest.MockedFunction<typeof useTidePortList>; // モック化されたuseTidePortListフックの型を定義

describe('usePortAutoCompleteのテスト', () => { // usePortAutoCompleteフックのテストスイートを定義
  const location = 'Tokyo'; // テストに使用するモックの場所データ

  beforeEach(() => {
    jest.clearAllMocks(); // 各テストの前にモックの呼び出し履歴と状態をクリア
  });

  it('ポートリストを正しく結合し、重複を除去する', () => { // ポートリストが結合され、重複が除去されているかをテスト
    const portList1: Port[] = [{ portName: 'Port A' }, { portName: 'Port B' }]; // 最初のポートリストのモックデータ
    const portList2: Port[] = [{ portName: 'Port B' }, { portName: 'Port C' }]; // 2番目のポートリストのモックデータ

    mockUsePortList.mockReturnValue({ portList: portList1, error: null }); // usePortListが正常なデータを返すようにモック
    mockUseTidePortList.mockReturnValue({ portList: portList2, error: null }); // useTidePortListが正常なデータを返すようにモック

    const { result } = renderHook(() => usePortAutoComplete(location)); // usePortAutoCompleteフックをレンダリングして結果を取得

    const expectedPortList: Port[] = [
      { portName: 'Port A' },
      { portName: 'Port B' },
      { portName: 'Port C' }
    ]; // 期待される結合後のポートリスト

    expect(result.current.portList).toEqual(expectedPortList); // フックが返すポートリストが期待通りか確認
    expect(result.current.error).toBeNull(); // エラーが発生していないことを確認
  });

  it('片方のポートリストが空の場合、もう片方のリストをそのまま使用する', () => { // 片方のポートリストが空の場合の処理をテスト
    const portList1: Port[] = [{ portName: 'Port A' }]; // 最初のポートリストのモックデータ
    const portList2: Port[] = []; // 2番目のポートリストが空の場合

    mockUsePortList.mockReturnValue({ portList: portList1, error: null }); // usePortListがデータを返すようにモック
    mockUseTidePortList.mockReturnValue({ portList: portList2, error: null }); // useTidePortListが空のリストを返すようにモック

    const { result } = renderHook(() => usePortAutoComplete(location)); // usePortAutoCompleteフックをレンダリングして結果を取得

    expect(result.current.portList).toEqual(portList1); // 片方が空のとき、もう片方のリストが正しく使用されているか確認
    expect(result.current.error).toBeNull(); // エラーが発生していないことを確認
  });

  it('両方のポートリストが空の場合、結果も空であるべき', () => { // 両方のポートリストが空の場合の処理をテスト
    mockUsePortList.mockReturnValue({ portList: [], error: null }); // usePortListが空のリストを返すようにモック
    mockUseTidePortList.mockReturnValue({ portList: [], error: null }); // useTidePortListが空のリストを返すようにモック

    const { result } = renderHook(() => usePortAutoComplete(location)); // usePortAutoCompleteフックをレンダリングして結果を取得

    expect(result.current.portList).toEqual([]); // 両方のリストが空の場合、結果も空であることを確認
    expect(result.current.error).toBeNull(); // エラーが発生していないことを確認
  });

  it('エラーが片方で発生した場合、エラーが返される', () => { // 片方のフックでエラーが発生した場合の処理をテスト
    const portList1: Port[] = [{ portName: 'Port A' }]; // 最初のポートリストのモックデータ
    const error = 'Failed to fetch tide ports'; // エラーメッセージを文字列で定義

    mockUsePortList.mockReturnValue({ portList: portList1, error: null }); // usePortListが正常なデータを返すようにモック
    mockUseTidePortList.mockReturnValue({ portList: [], error }); // useTidePortListがエラーを返すようにモック

    const { result } = renderHook(() => usePortAutoComplete(location)); // usePortAutoCompleteフックをレンダリングして結果を取得

    expect(result.current.portList).toEqual(portList1); // 正常に取得できたポートリストが返されていることを確認
    expect(result.current.error).toEqual(error); // エラーが発生した場合、そのエラーが返されることを確認
  });

  it('両方のフックでエラーが発生した場合、最初のエラーが返される', () => { // 両方のフックでエラーが発生した場合の処理をテスト
    const error1 = 'Failed to fetch ports'; // 最初のエラーメッセージを文字列で定義
    const error2 = 'Failed to fetch tide ports'; // 2番目のエラーメッセージを文字列で定義

    mockUsePortList.mockReturnValue({ portList: [], error: error1 }); // usePortListがエラーを返すようにモック
    mockUseTidePortList.mockReturnValue({ portList: [], error: error2 }); // useTidePortListがエラーを返すようにモック

    const { result } = renderHook(() => usePortAutoComplete(location)); // usePortAutoCompleteフックをレンダリングして結果を取得

    expect(result.current.portList).toEqual([]); // 両方のリストが空の場合、結果も空であることを確認
    expect(result.current.error).toEqual(error1); // 最初に発生したエラーが返されることを確認
  });
});
