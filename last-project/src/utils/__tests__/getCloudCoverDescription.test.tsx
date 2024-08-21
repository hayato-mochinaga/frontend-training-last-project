import { getCloudCoverDescription } from '../getCloudCoverDescription';

describe('getCloudCoverDescription', () => {

    // 雨が降っている場合
    it('雨の値が0より大きい場合、「雨」とUmbrellaIconを返す', () => {
        const result = getCloudCoverDescription(0, 1);
        expect(result).toMatchSnapshot(); // スナップショットを使って比較
    });

    // 快晴の条件
    it('雲量が10以下で雨が降っていない場合、「快晴」とFlareIconを返す', () => {
        const result = getCloudCoverDescription(0, 0);
        expect(result).toMatchSnapshot(); // スナップショットを使って比較
    });

    // 晴れの条件
    it('雲量が11から80までで雨が降っていない場合、「晴れ」とWbSunnyIconを返す', () => {
        const result = getCloudCoverDescription(11, 0);
        expect(result).toMatchSnapshot(); // スナップショットを使って比較
    });

    // 曇りの条件
    it('雲量が80を超える場合、またはそれ以外の場合で雨が降っていない場合、「曇り」とCloudIconを返す', () => {
        const result = getCloudCoverDescription(81, 0);
        expect(result).toMatchSnapshot(); // スナップショットを使って比較
    });

});
