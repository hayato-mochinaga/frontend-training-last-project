import React from 'react';
import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { getRainfallDescription } from '../../../utils/getRainfallDescription';

interface WeatherGraphProps {
    data: Array<{ time: string; rainfall: number }>;
}


const WeatherGraph: React.FC<WeatherGraphProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart
                data={data}
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="colorRainfall" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#2c2cffb4" stopOpacity={0.7} />
                        <stop offset="95%" stopColor="#2cd8ffb4" stopOpacity={0.3} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tickMargin={10} stroke="#ffffff" />
                <YAxis tickMargin={10} stroke="#ffffff" />
                <Tooltip
                    content={({ payload, label }) => {
                        if (payload && payload.length) {
                            const rainfallDescription = getRainfallDescription(payload[0].value);
                            return (
                                <div className="custom-tooltip" style={{ backgroundColor: 'rgba(0, 0, 0, 0.778)', padding: '1.4rem 1.01rem 1.4rem 1.01rem', borderRadius: '5px', color: 'white', lineHeight: '1.33em' }}>
                                    <p className="label" style={{ fontSize: '0.95em', fontWeight: '500', margin: '0' }}>{`${label}`}</p>
                                    {rainfallDescription && (
                                        <p className="label" style={{ margin: '0', fontSize: '0.85em' }}>{rainfallDescription}</p>
                                    )}
                                    <p className="label" style={{ margin: '0', fontSize: '0.95em' }}>降雨量：<span style={{ fontSize: '1.4em', fontWeight: 'bold' }}>{`${payload[0].value}`}</span> mm</p>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <Area type="monotone" dataKey="rainfall" stroke="#3edcffb4" fill="url(#colorRainfall)" strokeWidth={2.1} />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default WeatherGraph;
