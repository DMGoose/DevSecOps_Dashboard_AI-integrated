import React, { useState, useEffect, use } from 'react';
import styled from "styled-components";
import RiskLevelBarChart from './RiskLevelBarChart';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';


function AlertSummaryTable({ data }) {

    const zapData = data.filter(item => item.tool === 'OWASP ZAP');
    const trivyData = data.filter(item => item.tool === 'Trivy');
    const codeQLData = data.filter(item => item.tool === 'CodeQL');


    // ---- 处理不同工具的分级格式 ----
    //处理zap的riskLevel
    const extractZapRiskLevel = (riskStr) => {
        if (!riskStr) return '';
        return riskStr.split('(')[0].trim();  // 只要前面的 Risk Level
    };

    //处理格式不统一的逻辑
    const normalizeSeverity = (item) => {
        const risk = extractZapRiskLevel(item.risk);
        if (item.risk) {
            // ZAP 格式，像 "Medium (Medium)"
            if (risk.includes('High')) return 'High';
            if (risk.includes('Medium')) return 'Medium';
            if (risk.includes('Low')) return 'Low';
            if (risk.includes('Informational')) return 'Info';
            if (risk.includes('False')) return 'False +';
        }

        if (item.severity) {
            const severityScore = parseFloat(item.severity);
            if (severityScore >= 7.0) return 'High';
            if (severityScore >= 4.0) return 'Medium';
            if (severityScore > 0) return 'Low';
        }

        return 'Info'; // fallback
    }

    const getSeveritySummary = (dataset) => {
        const allResults = dataset.flatMap(toolItem => toolItem.results || []);
        const counts = { 'High': 0, 'Medium': 0, 'Low': 0, 'Info': 0, 'False +': 0 };
        allResults.forEach(item => {
          const level = normalizeSeverity(item);
          counts[level] = (counts[level] || 0) + 1;
        });
        return counts;
      };

    // 获取每个工具的风险级别统计
    const codeQLSeverity = getSeveritySummary(codeQLData);
    const zapSeverity = getSeveritySummary(zapData);
    const trivySeverity = getSeveritySummary(trivyData);

    useEffect(() => {
        console.log('CodeQL Severity:', codeQLSeverity);
        console.log('ZAP Severity:', zapSeverity);
        console.log('Trivy Severity:', trivySeverity);
    }, [codeQLSeverity, zapSeverity, trivySeverity]);
    

    return (
        
        <TableWrapper>

          <ChartWrapper>
                <RiskLevelBarChart severityCounts={ codeQLSeverity} name={'CodeQL'}/>
            </ChartWrapper>

            <ChartWrapper>
                <RiskLevelBarChart severityCounts={zapSeverity} name={'Zap'} />
            </ChartWrapper>


            <ChartWrapper>
                <RiskLevelBarChart severityCounts={trivySeverity} name={'Trivy'}/>
            </ChartWrapper>


            
            {/* <Table>
                <thead>
                    <tr>
                        <th>Trivy Risk Summary</th>
                        <th>Number of Alerts</th>
                    </tr>
                </thead>
                <tbody>
                    {levels.map(level => (
                        <tr key={level}>
                            <td>
                                <ColorBox style={{ backgroundColor: RISK_COLORS[level] }} />
                                {level}
                            </td>
                            <td>{trivySeverity[level] || 0}</td>
                        </tr>
                    ))}
                </tbody>
            </Table> */}
        </TableWrapper>
        
    );
}

const TableWrapper = styled.div`
  margin: 20px 0;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  padding-bottom: 60px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 20px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.25);
`;

const ChartWrapper = styled.div`
  justify-content: space-between;
  min-width: 33%;
  height: 250px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    text-align: left;
    padding: 12px;
    font-weight: 600;
  }
  thead {
    background-color: #f3f3f3;
  }
  tbody tr {
    border-top: 1px solid #e0e0e0;
  }
`;

const ColorBox = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 12px;
  border-radius: 4px;
`;

export default AlertSummaryTable;
