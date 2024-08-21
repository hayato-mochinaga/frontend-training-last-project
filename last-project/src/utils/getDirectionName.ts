export const getDirectionName = (degree: number) => {
    if (degree < 0 || degree > 360) return "";  // -1や361度などの無効な角度に対する処理
    if (degree === 360 || degree >= 348.75 || degree < 11.25) return "北";  // 360度も「北」として扱う
    if (degree >= 11.25 && degree < 33.75) return "北北東";
    if (degree >= 33.75 && degree < 56.25) return "北東";
    if (degree >= 56.25 && degree < 78.75) return "東北東";
    if (degree >= 78.75 && degree < 101.25) return "東";
    if (degree >= 101.25 && degree < 123.75) return "東南東";
    if (degree >= 123.75 && degree < 146.25) return "南東";
    if (degree >= 146.25 && degree < 168.75) return "南南東";
    if (degree >= 168.75 && degree < 191.25) return "南";
    if (degree >= 191.25 && degree < 213.75) return "南南西";
    if (degree >= 213.75 && degree < 236.25) return "南西";
    if (degree >= 236.25 && degree < 258.75) return "西南西";
    if (degree >= 258.75 && degree < 281.25) return "西";
    if (degree >= 281.25 && degree < 303.75) return "西北西";
    if (degree >= 303.75 && degree < 326.25) return "北西";
    if (degree >= 326.25 && degree < 348.75) return "北北西";
    return "";
};
