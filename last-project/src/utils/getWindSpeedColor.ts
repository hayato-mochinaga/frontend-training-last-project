export const getWindSpeedColor = (windSpeed: number) => {
    if (windSpeed <= 0.2) return "#00FF00"; // 平穏/静穏（緑）
    if (windSpeed <= 1.5) return "#7FFF00"; // 至軽風（黄緑）
    if (windSpeed <= 3.3) return "#FFFF00"; // 軽風（黄色）
    if (windSpeed <= 5.4) return "#FFA500"; // 軟風（オレンジ）
    if (windSpeed <= 7.9) return "#FF4500"; // 和風（オレンジレッド）
    if (windSpeed <= 10.7) return "#FF0000"; // 疾風（赤）
    if (windSpeed <= 13.8) return "#8B0000"; // 雄風（ダークレッド）
    if (windSpeed <= 17.1) return "#800080"; // 強風（紫）
    if (windSpeed <= 20.7) return "#4B0082"; // 疾強風（インディゴ）
    if (windSpeed <= 24.4) return "#000080"; // 大強風（ネイビー）
    return "#000080"; // 猛烈な風（ネイビー）
};