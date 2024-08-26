export const getBarColor = (cloudCover: number, rain: number) => {
    if (rain > 0) return "#8884d8a1"; // 雨が降っている場合の色（青紫色）
    if (cloudCover <= 10) return "#ffa600a1"; // 快晴の場合の色（明るいオレンジ）

    // 晴れから曇りまでのグラデーション
    if (cloudCover <= 30) return "#ffba4aa1"; // 少し曇っている（明るいオレンジ）
    if (cloudCover <= 50) return "#ff9b33a1"; // やや曇り（オレンジ）
    if (cloudCover <= 70) return "#ff7d1ca1"; // 曇りが増してきた（濃いオレンジ）
    if (cloudCover <= 80) return "#ff5f05a1"; // 曇りがさらに進行（暗いオレンジ）
    
    return "#c9c9c9a1"; // 完全に曇り（どんよりした灰色）
};
