import { getWindSpeedDescription } from '../getWindSpeedDescription';

describe('getWindSpeedDescription', () => {
  it('should return "平穏 " for wind speeds less than or equal to 0.2', () => {
    expect(getWindSpeedDescription(0.19)).toBe('平穏 ');
    expect(getWindSpeedDescription(0.2)).toBe('平穏 ');
  });

  it('should return "至軽風" for wind speeds greater than 0.2 and less than or equal to 1.5', () => {
    expect(getWindSpeedDescription(0.21)).toBe('至軽風');
    expect(getWindSpeedDescription(0.3)).toBe('至軽風');
  });

  it('should return "軟風" for wind speeds greater than 3.3 and less than or equal to 5.4', () => {
    expect(getWindSpeedDescription(4)).toBe('軟風');
  });

  it('should return "疾風" for wind speeds greater than 7.9 and less than or equal to 10.7', () => {
    expect(getWindSpeedDescription(10.5)).toBe('疾風');
  });

  it('should return "大強風" for wind speeds greater than 20.7 and less than or equal to 24.4', () => {
    expect(getWindSpeedDescription(24.3)).toBe('大強風');
    expect(getWindSpeedDescription(24.4)).toBe('大強風');
  });

  it('should return "猛烈な風" for wind speeds greater than 24.4', () => {
    expect(getWindSpeedDescription(24.5)).toBe('猛烈な風');
    expect(getWindSpeedDescription(100)).toBe('猛烈な風');
  });
});
