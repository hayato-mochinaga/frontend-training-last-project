import React from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart, ReferenceLine
} from 'recharts';
import NavigationIcon from '@mui/icons-material/Navigation'; // MUIのNavigationアイコンをインポート

interface WindAndTempGraphProps {
    data: {
        time: string[];
        temperature: number[];
        windSpeed: number[];
        windDirection: number[];
    };
}

// 角度に対応する方角を返す関数
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
    if (degree >= 236.25 && degree < 258.75) return "西南西";
    if (degree >= 258.75 && degree < 281.25) return "西";
    if (degree >= 281.25 && degree < 303.75) return "西北西";
    if (degree >= 303.75 && degree < 326.25) return "北西";
    if (degree >= 326.25 && degree < 348.75) return "北北西";
    return "";
};

const WindAndTempGraph: React.FC<WindAndTempGraphProps> = ({ data }) => {
    // 平均気温を計算
    const averageTemperature = data.temperature.reduce((sum, temp) => sum + temp, 0) / data.temperature.length;

    // グラフ用のデータを整形
    const chartData = data.time.map((time, index) => ({
        time,
        temperature: data.temperature[index],
        windSpeed: data.windSpeed[index],
        windDirection: data.windDirection[index],
    }));

    // 時間フォーマットの関数
    const formatTime = (time: string) => {
        const date = new Date(time);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    // Tooltipで使用する時刻のフォーマット関数
    const formatTooltipTime = (time: string) => {
        const date = new Date(time);
        return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <h2>Wind and Temperature Graph Components</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tickFormatter={formatTime} tickMargin={10} stroke="#ffffff" />
                    <YAxis tickMargin={10} stroke="#ffffff" />
                    <Tooltip
                        content={({ payload, label }) => {
                            if (payload && payload.length) {
                                const windSpeed = payload[0].payload.windSpeed;
                                const windDirection = payload[0].payload.windDirection;
                                const directionName = getDirectionName(windDirection);
                                return (
                                    <div className="custom-tooltip" style={{ backgroundColor: 'rgba(0, 0, 0, 0.778)', padding: '1.4rem 1.01rem 1.4rem 1.01rem', borderRadius: '5px', color: 'white', lineHeight: '1.33em' }}>
                                        <p className="label" style={{ fontSize: '1.06em', fontWeight: '500', margin: '0' }}>{`${formatTooltipTime(label)}`}</p>
                                        <p className="label" style={{ margin: '0' }}>気温: <span style={{ fontSize: '1.4em', fontWeight: 'bold' }}>{`${payload[0].value}°C`}</span></p>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0.5rem 0' }}>
                                            <span style={{ fontSize: '0.7rem', fontWeight: '500' }}>{directionName}</span> {/* 方角を表示 */}
                                            <NavigationIcon
                                                style={{
                                                    transform: `rotate(${windDirection}deg)`,
                                                    fill: '#ffffff',
                                                    marginBottom: '0.2rem',
                                                    fontSize: '2em'
                                                }}
                                            />
                                            <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{`${windSpeed} m/s`}</span>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Line type="monotone" dataKey="temperature" stroke="#ff7300" strokeWidth={2} />
                    <ReferenceLine
                        y={averageTemperature}
                        stroke="#ff0000"
                        strokeDasharray="3 3"
                        label={{ value: `平均気温 ${averageTemperature.toFixed(1)}°C`, position: 'insideTop', fill: '#ffffff' }}
                    />
                </LineChart>
            </ResponsiveContainer>
            <h2>openmeteo API responseData</h2>
            <ul>
                {data.time.map((time, index) => (
                    <li key={index}>
                        <p>時間: {formatTime(time)}</p>
                        <p>気温: {data.temperature[index]}°C</p>
                        <p>風速: {data.windSpeed[index]} m/s</p>
                        <p>風向: {data.windDirection[index]}°</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WindAndTempGraph;
