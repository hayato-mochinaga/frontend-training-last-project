import { getBarColor } from '../getBarColor';

describe('getBarColor', () => {

  // 雨が降っている場合
  it('雨の値が0より大きい場合、色コード "#8884d8a1"（紫）を返す', () => {
    expect(getBarColor(0, 1)).toBe("#8884d8a1"); // 中間値：cloudCover 0、rain 1
    expect(getBarColor(100, 10)).toBe("#8884d8a1"); // 中間値：cloudCover 100、rain 10
  });

  // 快晴の条件
  it('雲量が10以下で雨が降っていない場合、色コード "#ffa600a1"（オレンジ）を返す', () => {
    expect(getBarColor(0, 0)).toBe("#ffa600a1"); // 境界値：cloudCover 0、rain 0
    expect(getBarColor(10, 0)).toBe("#ffa600a1"); // 境界値：cloudCover 10、rain 0
    expect(getBarColor(5, 0)).toBe("#ffa600a1"); // 中間値：cloudCover 5、rain 0
  });

  // 晴れの条件
  it('雲量が11から80までで雨が降っていない場合、色コード "#ff7300a1"（濃いオレンジ）を返す', () => {
    expect(getBarColor(11, 0)).toBe("#ff7300a1"); // 境界値：cloudCover 11、rain 0
    expect(getBarColor(80, 0)).toBe("#ff7300a1"); // 境界値：cloudCover 80、rain 0
    expect(getBarColor(50, 0)).toBe("#ff7300a1"); // 中間値：cloudCover 50、rain 0
  });

  // 曇りの条件
  it('雲量が80を超える場合で雨が降っていない場合、色コード "#c9c9c9a1"（灰色）を返す', () => {
    expect(getBarColor(81, 0)).toBe("#c9c9c9a1"); // 境界値：cloudCover 81、rain 0
    expect(getBarColor(100, 0)).toBe("#c9c9c9a1"); // 境界値：cloudCover 100、rain 0
    expect(getBarColor(90, 0)).toBe("#c9c9c9a1"); // 中間値：cloudCover 90、rain 0
  });

});
