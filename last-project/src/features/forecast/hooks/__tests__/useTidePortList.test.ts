import { renderHook } from '@testing-library/react-hooks'; // React Hooksのテストを行うためのライブラリをインポート
import useTidePortList from '../useTidePortList'; // テスト対象のカスタムフックをインポート

// console.errorをモックして、テスト中に出力されるエラーメッセージを抑制する設定
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {}); // console.errorをスパイして、空の実装に置き換える
});

afterEach(() => {
  jest.clearAllMocks(); // 各テスト後にモックをクリアし、テスト間の副作用を排除
});

describe('useTidePortList', () => {
  // 有効な都道府県名が指定された場合、その都道府県の港リストが返されるかを確認するテストケース
  it('有効な都道府県名が指定された場合、その都道府県の港リストを返す', () => {
    const { result } = renderHook(() => useTidePortList('北海道')); // '北海道'を引数にフックを実行

    // 期待される港リストが返されることを確認
    expect(result.current.portList).toEqual(expect.arrayContaining([
      { portName: '蘂取' }, // 北海道の港名の一例
      { portName: '紗万部' }, // 北海道の港名の一例
      { portName: '内岡' }, // 北海道の港名の一例
      // その他の北海道の港名を追加可能
    ]));
    expect(result.current.error).toBeNull(); // エラーメッセージがnullであることを確認
  });

  // 存在しない都道府県名が指定された場合、エラーメッセージが返されるかを確認するテストケース
  it('存在しない都道府県名が指定された場合、エラーメッセージを返す', () => {
    const { result } = renderHook(() => useTidePortList('無効な場所')); // '無効な場所'を引数にフックを実行

    expect(result.current.portList).toEqual([]); // 港リストが空であることを確認
    expect(result.current.error).toEqual('潮汐港名の取得に失敗しました'); // 適切なエラーメッセージが返されることを確認
  });

  // 港が存在しない都道府県名が指定された場合、空のリストが返されるかを確認するテストケース
  it('港が存在しない都道府県名が指定された場合、空のリストを返す', () => {
    const { result } = renderHook(() => useTidePortList('群馬県')); // '群馬県'を引数にフックを実行

    expect(result.current.portList).toEqual([]); // 港リストが空であることを確認
    expect(result.current.error).toBeNull(); // エラーメッセージが返されないことを確認
  });

  // 空の文字列が指定された場合、エラーメッセージが返されるかを確認するテストケース
  it('空の文字列が指定された場合、エラーメッセージを返す', () => {
    const { result } = renderHook(() => useTidePortList('')); // 空の文字列を引数にフックを実行

    expect(result.current.portList).toEqual([]); // 港リストが空であることを確認
    expect(result.current.error).toEqual('潮汐港名の取得に失敗しました'); // 適切なエラーメッセージが返されることを確認
  });

  // 複数の都道府県名が指定された場合、エラーメッセージが返されるかを確認するテストケース
  it('複数の都道府県名が指定された場合、エラーメッセージを返す', () => {
    const { result } = renderHook(() => useTidePortList('北海道,青森県')); // '北海道,青森県'を引数にフックを実行

    expect(result.current.portList).toEqual([]); // 港リストが空であることを確認
    expect(result.current.error).toEqual('潮汐港名の取得に失敗しました'); // 適切なエラーメッセージが返されることを確認
  });
});
