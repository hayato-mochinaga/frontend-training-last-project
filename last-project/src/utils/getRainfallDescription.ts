export const getRainfallDescription = (rainfall: number): string => {
    if (rainfall === 0) return '';
    if (rainfall <= 1) return 'ごく弱い雨';
    if (rainfall <= 2) return '弱い雨';
    if (rainfall <= 5) return '小雨';
    if (rainfall <= 10) return 'やや強い雨';
    if (rainfall <= 20) return '強い雨';
    if (rainfall <= 30) return '激しい雨';
    if (rainfall <= 50) return '非常に激しい雨';
    return '猛烈な雨';
};