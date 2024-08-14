import React from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Bar, ReferenceLine, Cell
} from 'recharts';
import NavigationIcon from '@mui/icons-material/Navigation';
import FlareIcon from '@mui/icons-material/Flare';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';

interface WindAndTempGraphProps {
    data: {
        time: string[];
        temperature: number[];
        windSpeed: number[];
        windDirection: number[];
        cloudCover: number[];
        rain: number[];
    };
}

const getDirectionName = (degree: number) => {
    if (degree >= 348.75 || degree < 11.25) return "北";
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
    if (degree >= 236.25 && 258.75) return "西南西";
    if (degree >= 258.75 && 281.25) return "西";
    if (degree >= 281.25 && 303.75) return "西北西";
    if (degree >= 303.75 && degree < 326.25) return "北西";
    if (degree >= 326.25 && degree < 348.75) return "北北西";
    return "";
};

const getCloudCoverDescription = (cloudCover: number, rain: number) => {
    if (rain > 0) return { description: "雨", icon: <UmbrellaIcon style={{ fill: '#ffffff', marginRight: '0.3rem' }} /> };
    if (cloudCover <= 10) return { description: "快晴", icon: <FlareIcon style={{ fill: '#ffffff', marginRight: '0.3rem' }} /> };
    if (cloudCover <= 80) return { description: "晴れ", icon: <WbSunnyIcon style={{ fill: '#ffffff', marginRight: '0.3rem' }} /> };
    return { description: "曇り", icon: <CloudIcon style={{ fill: '#ffffff', marginRight: '0.3rem' }} /> };
};

const getBarColor = (cloudCover: number, rain: number) => {
    if (rain > 0) return "#8884d8a1";
    if (cloudCover <= 10) return "#ffa600a1";
    if (cloudCover <= 80) return "#ff7300a1";
    return "#c9c9c9a1";
};

const getWindSpeedColor = (windSpeed: number) => {
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

const getWindSpeedDescription = (windSpeed: number) => {
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

const WindAndTempGraph: React.FC<WindAndTempGraphProps> = ({ data }) => {
    const averageTemperature = data.temperature.reduce((sum, temp) => sum + temp, 0) / data.temperature.length;

    const chartData = data.time.map((time, index) => ({
        time,
        temperature: data.temperature[index],
        windSpeed: data.windSpeed[index],
        windDirection: data.windDirection[index],
        cloudCover: data.cloudCover[index],
        rain: data.rain[index],
    }));

    const formatTime = (time: string) => {
        const date = new Date(time);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const formatTooltipTime = (time: string) => {
        const date = new Date(time);
        return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <h2>Wind and Temperature Graph Components</h2>
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tickFormatter={formatTime} tickMargin={10} stroke="#ffffff" />
                    <YAxis yAxisId="left" tickMargin={2} stroke="#ff7300" label={{ value: "気温(℃)", angle: 270, position: "insideLeft", fill: "#ff7300e7" }} />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickMargin={10}
                        stroke="#c9c9c9"
                        tick={{ fill: "#c9c9c9", fontWeight: "bold", stroke: "#c9c9c9", strokeWidth: 0.5 }}
                        label={{ value: "雲量 (%)", angle: 90, position: "insideRight", fill: "#c9c9c9" }}
                    />
                    <Tooltip
                        content={({ payload, label }) => {
                            if (payload && payload.length) {
                                const windSpeed = payload[0].payload.windSpeed;
                                const windDirection = payload[0].payload.windDirection;
                                const cloudCover = payload[0].payload.cloudCover;
                                const rain = payload[0].payload.rain;
                                const directionName = getDirectionName(windDirection);
                                const { description, icon } = getCloudCoverDescription(cloudCover, rain);
                                const windSpeedColor = getWindSpeedColor(windSpeed);
                                const windSpeedDescription = getWindSpeedDescription(windSpeed);
                                return (
                                    <div className="custom-tooltip" style={{ backgroundColor: 'rgba(0, 0, 0, 0.778)', padding: '1.4rem 1.01rem 1.4rem 1.01rem', borderRadius: '5px', color: 'white', lineHeight: '1.33em', textAlign: 'center' }}>
                                        <p className="label" style={{ fontSize: '1.06em', fontWeight: '500', margin: '0' }}>{`${formatTooltipTime(label)}`}</p>
                                        <p className="label" style={{ margin: '0' }}>気温: <span style={{ fontSize: '1.4em', fontWeight: 'bold' }}>{`${payload[0].payload.temperature}°C`}</span></p>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0.5rem 0' }}>
                                            <span style={{ fontSize: '0.7rem', fontWeight: '500' }}>{directionName}</span>
                                            <NavigationIcon
                                                style={{
                                                    transform: `rotate(${windDirection}deg)`,
                                                    fill: windSpeedColor,
                                                    marginBottom: '0.2rem',
                                                    fontSize: '2em'
                                                }}
                                            />
                                            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{`${windSpeed} m/s`}</span>
                                            <span style={{ fontSize: '0.9rem', fontWeight: '500', marginTop: '0.2rem' }}>{windSpeedDescription}</span> {/* 風速の強さをテキスト表示 */}
                                        </div>
                                        <p className="label" style={{ margin: '0' }}>雲量: <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{`${cloudCover}%`}</span></p>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.5rem' }}>
                                            {icon}
                                            <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{description}</span>
                                        </div>
                                        {rain > 0 && (
                                            <p className="label" style={{ margin: '0' }}>降水量: <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{`${rain}mm`}</span></p>
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Bar yAxisId="right" dataKey="cloudCover">
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(entry.cloudCover, entry.rain)} />
                        ))}
                    </Bar>
                    <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#ff7300" strokeWidth={2} />
                    <ReferenceLine
                        y={averageTemperature}
                        yAxisId="left"
                        stroke="#ff3c00"
                        strokeDasharray="3 3"
                        label={{ value: `平均気温 ${averageTemperature.toFixed(1)}°C`, position: 'bottom', fill: '#ffffff' }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
            <h2>openmeteo API responseData</h2>
            <ul>
                {data.time.map((time, index) => (
                    <li key={index}>
                        <p>時間: {formatTime(time)}</p>
                        <p>気温: {data.temperature[index]}°C</p>
                        <p>風速: {data.windSpeed[index]} m/s</p>
                        <p>風向: {data.windDirection[index]}°</p>
                        <p>雲量: {data.cloudCover[index]}%</p>
                        <p>降水量: {data.rain[index]}mm</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WindAndTempGraph;
