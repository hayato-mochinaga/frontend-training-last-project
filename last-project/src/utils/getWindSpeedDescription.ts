export const getWindSpeedDescription = (windSpeed: number) => {
    if (windSpeed <= 0.2) return "平穏 ";
    if (windSpeed <= 1.5) return "至軽風";
    if (windSpeed <= 3.3) return "軽風";
    if (windSpeed <= 5.4) return "軟風";
    if (windSpeed <= 7.9) return "和風";
    if (windSpeed <= 10.7) return "疾風";
    if (windSpeed <= 13.8) return "雄風";
    if (windSpeed <= 17.1) return "強風";
    if (windSpeed <= 20.7) return "疾強風";
    if (windSpeed <= 24.4) return "大強風";
    return "猛烈な風";
};

//0.19,0.2,0.3

//4,10.5

//24.3,24.4,24.5

//100とかめちゃでかいので猛烈な風でるか


//外れ値でマイナス→今回は入らないからいらない





