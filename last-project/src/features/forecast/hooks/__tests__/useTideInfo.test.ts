import axios from 'axios';
import useTideInfo from '../useTideInfo';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useTideInfoのテスト', () => {
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks(); // テスト前にすべてのモックをクリア
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {}); // console.errorをモックしてエラーを抑制
  });

  afterEach(() => {
    consoleErrorMock.mockRestore(); // テスト後にconsole.errorのモックを元に戻す
  });

  it('正常に潮汐情報を取得する', async () => {
    const mockQuery = '伊良湖'; // 実際に潮汐情報が取得可能な港名を指定
    const mockResponseData = {
      tide: {
        chart: {
          '2024-01-01': {
            sun: {
              astro_twilight: ['05:00', '20:00'],
              regular_twilight: ['05:30', '19:30'],
              rise: '06:00',
              midline: '12:00',
              set: '18:00',
            },
            moon: {
              brightness: '80%',
              age: '10',
              title: '満月',
              rise: '18:00',
              midline: '00:00',
              set: '06:00',
            },
            edd: [],
            flood: [],
            tide: [],
          },
        },
      },
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockResponseData });

    const result = await useTideInfo(mockQuery);

    expect(result).toEqual({
      sun: mockResponseData.tide.chart['2024-01-01'].sun,
      moon: mockResponseData.tide.chart['2024-01-01'].moon,
      edd: [],
      flood: [],
      tide: [],
    });
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it('潮汐情報の取得が失敗した場合、エラーメッセージが返される', async () => {
    const mockQuery = '伊良湖'; // 実際に潮汐情報が取得可能な港名を指定
    const mockError = new Error('Network Error');
    mockedAxios.get.mockRejectedValueOnce(mockError);

    const result = await useTideInfo(mockQuery);

    expect(result).toBe('潮汐情報の取得に失敗しました。');
  });
});
