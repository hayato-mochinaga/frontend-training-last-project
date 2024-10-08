import React from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Bar, ReferenceLine, Cell, LineProps
} from 'recharts';
import NavigationIcon from '@mui/icons-material/Navigation';
import { getWindSpeedDescription } from '../../../utils/getWindSpeedDescription';
import { getDirectionName } from '../../../utils/getDirectionName';
import { getCloudCoverDescription } from '../../../utils/getCloudCoverDescription';
import { getWindSpeedColor } from '../../../utils/getWindSpeedColor';
import { getBarColor } from '../../../utils/getBarColor';
import { formatTime } from '../../../utils/formatTime';

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

// 気温に基づく色を決定する関数
const getTemperatureColor = (temperature: number): string => {
    if (temperature <= 0) return "#00f"; // 0°C以下は青色
    if (temperature <= 10) return "#1e90ff"; // 1°C〜10°Cは少し明るい青色
    if (temperature <= 20) return "#00ff00"; // 11°C〜20°Cは緑色
    if (temperature <= 30) return "#ffd700"; // 21°C〜30°Cは黄色
    return "#ff4500"; // 31°C以上は赤色
};

// カスタムラインプロップ
const CustomizedDot: React.FC<LineProps> = (props) => {
    const { cx, cy, payload } = props;
    const temperatureColor = getTemperatureColor(payload.temperature);

    return (
        <circle cx={cx} cy={cy} r={2} fill={temperatureColor} stroke="none" />
    );
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

    console.log(data);

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tickFormatter={(time) => formatTime(time)} tickMargin={10} stroke="#ffffff" />
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
                                        <p className="label" style={{ fontSize: '1.06em', fontWeight: '500', margin: '0' }}>{`${formatTime(label, true)}`}</p> {/* 日付と時間を表示 */}
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
                                            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{windSpeedDescription}</span> {/* 風速の強さをテキスト表示 */}
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
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="temperature"
                        stroke="#ff7300"
                        strokeWidth={2}
                        dot={<CustomizedDot />}
                        activeDot={{ r: 8 }}
                        strokeDasharray="none"
                    />
                    <ReferenceLine
                        y={averageTemperature}
                        yAxisId="left"
                        stroke="#ff3c00"
                        strokeDasharray="3 3"
                        label={{ value: `平均気温 ${averageTemperature.toFixed(1)}°C`, position: 'bottom', fill: '#ffffff' }}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </>
    );
};

export default WindAndTempGraph;
