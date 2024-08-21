export const getBarColor = (cloudCover: number, rain: number) => {
    if (rain > 0) return "#8884d8a1";
    if (cloudCover <= 10) return "#ffa600a1";
    if (cloudCover <= 80) return "#ff7300a1";
    return "#c9c9c9a1";
};