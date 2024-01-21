import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`$ ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export const PieChartUseThis = ({ dataIn }) => {

    const COLORS = ['#4682B4', '#82ca9d', '#FFA500', '#B0C4DE', '#6c757d', '#28a745', '#f8f9fa', '#343a40', '#FFFFFF'];
    const [inde, setInd] = useState(0);
    const onPieEnter = (_, index) => {
        setInd(index);
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart width={400} height={400}>
                <Pie
                    activeIndex={inde}
                    activeShape={renderActiveShape}
                    data={dataIn}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#4682B4"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                >
                    {
                        dataIn.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

export const RadarChartUseThis = ({ dataR, style }) => {
    return (
        <Box sx={style}>
            <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataR}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="2022" dataKey="A" stroke="#4682B4" fill="#4682B4" fillOpacity={0.3} />
                    <Radar name="2023" dataKey="B" stroke="#FFA500" fill="#FFA500" fillOpacity={0.3} />
                    <Legend />
                </RadarChart>
            </ResponsiveContainer>
        </Box>);
};

export const AreaChartUseThis = ({ data, style }) => {
    return (
        <Box sx={style}>
            <ResponsiveContainer>
                <AreaChart data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4682B4" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#4682B4" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FFA500" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#FFA500" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#4682B4" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="pv" stroke="#FFA500" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
}