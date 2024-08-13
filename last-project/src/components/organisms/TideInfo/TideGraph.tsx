import React from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine, ReferenceDot
} from 'recharts';

interface TideGraphProps {
    data: Array<{ time: string; cm: number; unix: number }>;
    sun: {
        rise: string;
        set: string;
    };
}

// カスタムラベルコンポーネント
const CustomReferenceLabel = ({ viewBox, value }: any) => {
    const { x, y } = viewBox;
    return (
        <text x={x + 10} y={y - 5} fill="#ffe5d6" fontSize="13.4" fontWeight='500' textAnchor="start">
            {value}
        </text>
    );
};

const roundToNearestTwentyMinutes = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const roundedMinutes = Math.round(minutes / 20) * 20;
    const adjustedMinutes = roundedMinutes === 60 ? 0 : roundedMinutes;
    const adjustedHours = roundedMinutes === 60 ? hours + 1 : hours;
    return `${adjustedHours.toString().padStart(2, '0')}:${adjustedMinutes.toString().padStart(2, '0')}`;
};

const TideGraph: React.FC<TideGraphProps> = ({ data, sun }) => {
    const averageLevel = data.reduce((sum, entry) => sum + entry.cm, 0) / data.length;
    const maxTide = data.reduce((prev, current) => (prev.cm > current.cm ? prev : current));
    const minTide = data.reduce((prev, current) => (prev.cm < current.cm ? prev : current));
    const roundedSunrise = roundToNearestTwentyMinutes(sun.rise);
    const roundedSunset = roundToNearestTwentyMinutes(sun.set);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorTide" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#2cd8ffb4" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#2cd8ffb4" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tickMargin={10} stroke="#ffffff" />
                <YAxis tickMargin={10} stroke="#ffffff" />
                <Tooltip
                    content={({ payload, label }) => {
                        if (payload && payload.length) {
                            return (
                                <div className="custom-tooltip" style={{ backgroundColor: 'rgba(0, 0, 0, 0.778)', padding: '1.4rem 1.01rem 1.4rem 1.01rem', borderRadius: '5px', color: 'white', lineHeight: '1.33em' }}>
                                    <p className="label" style={{ fontSize: '1.06em', fontWeight: '500', margin: '0' }}>{`${label}`}</p>
                                    <p className="label" style={{ margin: '0' }}>潮位: <span style={{ fontSize: '1.4em', fontWeight: 'bold' }}>{`${payload[0].value}cm`}</span></p>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <ReferenceLine
                    y={averageLevel}
                    stroke="#ff0000"
                    strokeDasharray="3 3"
                    label={<CustomReferenceLabel value={`平均水位 ${averageLevel.toFixed(1)}cm`} />}
                />
                <Area type="monotone" dataKey="cm" stroke="#3edcffb4" fill="url(#colorTide)" strokeWidth={2.1} />
                <ReferenceDot x={maxTide.time} y={maxTide.cm} r={6} fill="#3efff2dd" stroke="none" label={{ value: '満潮', position: 'bottom', fill: '#ffffff' }} />
                <ReferenceDot x={minTide.time} y={minTide.cm} r={6} fill="#3e88ffdd" stroke="none" label={{ value: '干潮', position: 'bottom', fill: '#ffffff' }} />
                <ReferenceDot x={roundedSunrise} y={0} r={6} fill="#ff4500dd" stroke="none" label={{ value: '日の出', position: 'top', fill: '#ffffff' }} />
                <ReferenceLine x={roundedSunrise} stroke="#ff4500dd" strokeDasharray="3 3" />
                <ReferenceDot x={roundedSunset} y={0} r={6} fill="#ffdf00dd" stroke="none" label={{ value: '日没', position: 'top', fill: '#ffffff' }} />
                <ReferenceLine x={roundedSunset} stroke="#ffdf00dd" strokeDasharray="3 3" />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default TideGraph;
