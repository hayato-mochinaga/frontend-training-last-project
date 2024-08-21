import { getDirectionName } from '../getDirectionName';

describe('getDirectionName', () => {

  // 「北」方向のテスト
  it('角度が348.75度から360度、または0度から11.25度の場合に「北」を返す', () => {
    expect(getDirectionName(0)).toBe('北');  // 境界値：0度「北」
    expect(getDirectionName(10)).toBe('北');  // 中間値：10度「北」
    expect(getDirectionName(348.75)).toBe('北');  // 境界値：348.75度「北」
    expect(getDirectionName(359.99)).toBe('北'); // 境界値：359.99度「北」（360度は理論上0度と同じ）
    expect(getDirectionName(360)).toBe('北');  // 境界値：360度「北」
  });

  // 「北北東」方向のテスト
  it('角度が11.25度から33.75度の場合に「北北東」を返す', () => {
    expect(getDirectionName(11.25)).toBe('北北東');  // 境界値：11.25度「北北東」
    expect(getDirectionName(22.5)).toBe('北北東');  // 中間値：22.5度「北北東」
    expect(getDirectionName(33.74)).toBe('北北東');  // 境界値：33.74度「北北東」
  });

  // 「北東」方向のテスト
  it('角度が33.75度から56.25度の場合に「北東」を返す', () => {
    expect(getDirectionName(33.75)).toBe('北東');  // 境界値：33.75度「北東」
    expect(getDirectionName(45)).toBe('北東');  // 中間値：45度「北東」
    expect(getDirectionName(56.24)).toBe('北東');  // 境界値：56.24度「北東」
  });

  // 「東北東」方向のテスト
  it('角度が56.25度から78.75度の場合に「東北東」を返す', () => {
    expect(getDirectionName(56.25)).toBe('東北東');  // 境界値：56.25度「東北東」
    expect(getDirectionName(67.5)).toBe('東北東');  // 中間値：67.5度「東北東」
    expect(getDirectionName(78.74)).toBe('東北東');  // 境界値：78.74度「東北東」
  });

  // 「東」方向のテスト
  it('角度が78.75度から101.25度の場合に「東」を返す', () => {
    expect(getDirectionName(78.75)).toBe('東');  // 境界値：78.75度「東」
    expect(getDirectionName(90)).toBe('東');  // 中間値：90度「東」
    expect(getDirectionName(101.24)).toBe('東');  // 境界値：101.24度「東」
  });

  // 「東南東」方向のテスト
  it('角度が101.25度から123.75度の場合に「東南東」を返す', () => {
    expect(getDirectionName(101.25)).toBe('東南東');  // 境界値：101.25度「東南東」
    expect(getDirectionName(112.5)).toBe('東南東');  // 中間値：112.5度「東南東」
    expect(getDirectionName(123.74)).toBe('東南東');  // 境界値：123.74度「東南東」
  });

  // 「南東」方向のテスト
  it('角度が123.75度から146.25度の場合に「南東」を返す', () => {
    expect(getDirectionName(123.75)).toBe('南東');  // 境界値：123.75度「南東」
    expect(getDirectionName(135)).toBe('南東');  // 中間値：135度「南東」
    expect(getDirectionName(146.24)).toBe('南東');  // 境界値：146.24度「南東」
  });

  // 「南南東」方向のテスト
  it('角度が146.25度から168.75度の場合に「南南東」を返す', () => {
    expect(getDirectionName(146.25)).toBe('南南東');  // 境界値：146.25度「南南東」
    expect(getDirectionName(157.5)).toBe('南南東');  // 中間値：157.5度「南南東」
    expect(getDirectionName(168.74)).toBe('南南東');  // 境界値：168.74度「南南東」
  });

  // 「南」方向のテスト
  it('角度が168.75度から191.25度の場合に「南」を返す', () => {
    expect(getDirectionName(168.75)).toBe('南');  // 境界値：168.75度「南」
    expect(getDirectionName(180)).toBe('南');  // 中間値：180度「南」
    expect(getDirectionName(191.24)).toBe('南');  // 境界値：191.24度「南」
  });

  // 「南南西」方向のテスト
  it('角度が191.25度から213.75度の場合に「南南西」を返す', () => {
    expect(getDirectionName(191.25)).toBe('南南西');  // 境界値：191.25度「南南西」
    expect(getDirectionName(202.5)).toBe('南南西');  // 中間値：202.5度「南南西」
    expect(getDirectionName(213.74)).toBe('南南西');  // 境界値：213.74度「南南西」
  });

  // 「南西」方向のテスト
  it('角度が213.75度から236.25度の場合に「南西」を返す', () => {
    expect(getDirectionName(213.75)).toBe('南西');  // 境界値：213.75度「南西」
    expect(getDirectionName(225)).toBe('南西');  // 中間値：225度「南西」
    expect(getDirectionName(236.24)).toBe('南西');  // 境界値：236.24度「南西」
  });

  // 「西南西」方向のテスト
  it('角度が236.25度から258.75度の場合に「西南西」を返す', () => {
    expect(getDirectionName(236.25)).toBe('西南西');  // 境界値：236.25度「西南西」
    expect(getDirectionName(247.5)).toBe('西南西');  // 中間値：247.5度「西南西」
    expect(getDirectionName(258.74)).toBe('西南西');  // 境界値：258.74度「西南西」
  });

  // 「西」方向のテスト
  it('角度が258.75度から281.25度の場合に「西」を返す', () => {
    expect(getDirectionName(258.75)).toBe('西');  // 境界値：258.75度「西」
    expect(getDirectionName(270)).toBe('西');  // 中間値：270度「西」
    expect(getDirectionName(281.24)).toBe('西');  // 境界値：281.24度「西」
  });

  // 「西北西」方向のテスト
  it('角度が281.25度から303.75度の場合に「西北西」を返す', () => {
    expect(getDirectionName(281.25)).toBe('西北西');  // 境界値：281.25度「西北西」
    expect(getDirectionName(292.5)).toBe('西北西');  // 中間値：292.5度「西北西」
    expect(getDirectionName(303.74)).toBe('西北西');  // 境界値：303.74度「西北西」
  });

  // 「北西」方向のテスト
  it('角度が303.75度から326.25度の場合に「北西」を返す', () => {
    expect(getDirectionName(303.75)).toBe('北西');  // 境界値：303.75度「北西」
    expect(getDirectionName(315)).toBe('北西');  // 中間値：315度「北西」
    expect(getDirectionName(326.24)).toBe('北西');  // 境界値：326.24度「北西」
  });

  // 「北北西」方向のテスト
  it('角度が326.25度から348.75度の場合に「北北西」を返す', () => {
    expect(getDirectionName(326.25)).toBe('北北西');  // 境界値：326.25度「北北西」
    expect(getDirectionName(337.5)).toBe('北北西');  // 中間値：337.5度「北北西」
    expect(getDirectionName(348.74)).toBe('北北西');  // 境界値：348.74度「北北西」
  });

  // 境界値と無効な角度のテスト
  it('角度が0度や360度の場合に「北」を返し、無効な角度の場合には空文字列を返す', () => {
    expect(getDirectionName(0)).toBe('北');  // 境界値：0度「北」
    expect(getDirectionName(360)).toBe('北');  // 境界値：360度「北」
    expect(getDirectionName(-1)).toBe('');  // 境界値：無効な角度（-1度）
    expect(getDirectionName(361)).toBe('');  // 境界値：無効な角度（361度）
  });
});
