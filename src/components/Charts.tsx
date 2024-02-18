import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from 'recharts';


const COLORS = ['#82ca9d', '#4682B4', '#FFA500', '#B0C4DE', '#6c757d', '#28a745', '#f8f9fa', '#343a40', '#FFFFFF'];

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

export const PieChartUseThis = ({ data }) => {

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
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#4682B4"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                >
                    {
                        data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}

export const RadarChartUseThis = ({ data, style }) => {
    return (
        <Box sx={style}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    {
                        Object.keys(data[0]).map((val, index) => {
                            if (typeof val === 'string' && val !== 'subject' && val !== 'fullMark') {
                                return (
                                    <Radar name={val} dataKey={val} stroke={COLORS[index % COLORS.length]} fill={COLORS[index % COLORS.length]} fillOpacity={0.3} />
                                )
                            } else {
                                return null;
                            }
                        })
                    }
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
                        {
                            Object.keys(data[0]).map((val, index) => {
                                if (typeof val === 'string' && val !== 'name') {
                                    return (
                                        <linearGradient id={val} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.8} />
                                            <stop offset="95%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0} />
                                        </linearGradient>
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    {
                        Object.keys(data[0]).map((val, index) => {
                            if (typeof val === 'string' && val !== 'name') {
                                return <Area type="monotone" dataKey={val} stroke={COLORS[index % COLORS.length]} fillOpacity={1} fill={`url(#${val})`} />
                            } else {
                                return null;
                            }
                        })
                    }
                </AreaChart>
            </ResponsiveContainer>
        </Box >
    );
}