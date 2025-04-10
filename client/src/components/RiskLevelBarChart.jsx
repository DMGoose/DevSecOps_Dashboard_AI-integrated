import React from 'react';
import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';


function RiskLevelBarChart({ severityCounts, name }) {

    const RISK_COLORS = {
        'High': '#dc3545',     // 胭脂红
        'Medium': '#f38933',   // 现代橙
        'Low': '#ffc107',      // 柔焦黄
        'Info': '#007bff',     // 湖蓝
        'False +': '#6c757d'   // 松柏绿
      };

    const data = Object.entries(severityCounts).map(([level, count]) => ({
        name: level,
        count,
        color: RISK_COLORS[level] || '#ccc',
    }));

    return (
        <ChartWrapper>
            <ChartTitle>{name} Risk Level Summary</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 30 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} allowDecimals={false} domain={[0, 'auto']}/>
                    <Tooltip
                        contentStyle={{ fontSize: '14px', borderRadius: '10px' }}
                        formatter={(value) => [`${value} alerts`, 'Count']}
                    />
                    <Bar
                        dataKey="count"
                        radius={[6, 6, 0, 0]} // 圆角上边两个角
                        animationDuration={800}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <LabelList dataKey="count" position="top" style={{ fill: '#333', fontWeight: 'bold' }}
                            formatter={(val) => (val === 0 ? '' : val)} />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartWrapper>
    );
}


const ChartWrapper = styled.div`
  flex: 1;
  min-width: 300px;
  margin-right: 20px;
`;

const ChartTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: #333;
`;



export default RiskLevelBarChart;
