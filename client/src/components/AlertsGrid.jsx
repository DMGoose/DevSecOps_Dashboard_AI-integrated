import React, { Component, useEffect, useState, useMemo } from 'react';
import styled from "styled-components"
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from "axios";
import { getSuggestions } from "../utils/APIRoutes";

function AlertsGrid({ data }) {

  const [activeTool, setActiveTool] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);  //用于弹窗
  const [sortOrder, setSortOrder] = useState('desc');; // 用于排序severity

  //处理zap的riskLevel
  const extractZapRiskLevel = (riskStr) => {
    if (!riskStr) return '';
    return riskStr.split('(')[0].trim();  // 只要前面的 Risk Level
  };

  // 返回对应颜色和文字
  const displaySeverity = (rawSeverity) => {
    if (!rawSeverity) return <Badge severity="unknown">Unknown</Badge>;
    const raw = rawSeverity.toString().toLowerCase();

    const score = parseFloat(raw);
    if (!isNaN(score)) {
      if (score >= 7.0) return <Badge severity="high">High</Badge>;
      if (score >= 4.0) return <Badge severity="medium">Medium</Badge>;
      return <Badge severity="low">Low</Badge>;
    }

    // ZAP: "Medium (High)" → "medium"
    const zapLevel = extractZapRiskLevel(raw);

    if (zapLevel === 'high') return <Badge severity="high">High</Badge>;
    if (zapLevel === 'medium') return <Badge severity="medium">Medium</Badge>;
    if (zapLevel === 'low') return <Badge severity="low">Low</Badge>;
    if (zapLevel === 'informational') return <Badge severity="info">Info</Badge>;

    return <Badge severity="unknown">Unknown</Badge>;
  };

  //用于sorted后的数据
  //data、activeTool、sortOrder 任意一个变动，都会触发重新排序
  const sortedResults = useMemo(() => {
    //activeTool 只是一个 字符串，比如 "Trivy", 我要的是字符串对应的数据
    //因此去data里面根据字符串找对应的数据 ?.是 JavaScript 的 可选链语法（optional chaining
    const results = data
      .filter(item => (item.tool || '').trim() === (activeTool || '').trim()) // 过滤出所有 Trivy 项
      .flatMap(item => item.results || []); // 把所有 results 合并为一个数组, 如果 activeToolData 存在，就拿它的 .results，否则用空数组。

    const score = (s) => {
      const raw = (s || '').toString();
      // // Trivy 风格，比如 "2.0", "7.3"
      const cvss = parseFloat(raw);
      if (!isNaN(cvss)) return cvss;

      // ZAP 风格，比如 "Medium (High)"
      const zapRisk = extractZapRiskLevel(raw).toLowerCase();
      if (zapRisk === 'high') return 10;
      if (zapRisk === 'medium') return 6;
      if (zapRisk === 'low') return 3;
      if (zapRisk === 'informational') return 1;

      return 0;
    };

    return [...results].sort((a, b) => {
      const aScore = score(a.risk || a.severity);
      const bScore = score(b.risk || b.severity);
      return sortOrder === 'asc' ? aScore - bScore : bScore - aScore;
    });
  }, [data, activeTool, sortOrder]);

  const changeOrder = () => {
    setSortOrder(prev => (prev === 'desc' ? 'asc' : 'desc'));
  }

  //activeTool默认选择第一个工具
  useEffect(() => {
    if (data.length > 0) {
      setActiveTool(data[0].tool);
    }
  }, [data]);

  //生成AI建议, 和后端交互
  const generateSuggestion = async (selectedAlert) => {
    console.log('generateSuggestion is working!@')
    setSelectedAlert({ ...selectedAlert, loading: true });
    const prompt = promptGenerateTemplate(selectedAlert);

    const AIsuggestion = await axios.post(getSuggestions,
      {
        prompt: prompt,
      });
    console.log(AIsuggestion);

    const suggestion = AIsuggestion.data?.suggestion || 'no response(error)';
    setSelectedAlert({ ...selectedAlert, loading: false, suggestion });
  }

  //生成promp模板
  const promptGenerateTemplate = (selectedAlert) => {
    return `
    You are a senior security engineer. Please provide concise and technical repair suggestions based on the following information, which are suitable for code patches or configuration modifications. Please avoid markdown or multi-paragraph structures and only output one paragraph.
      Tools: ${selectedAlert.tool}
      Type: ${selectedAlert.type}
      Name / CVE: ${selectedAlert.name || selectedAlert.cve || 'unknown'}
      Component: ${selectedAlert.component || selectedAlert.name}
      Risk / Severity：${selectedAlert.severity ||  selectedAlert.risk || 'unknown'}
      Description ：${selectedAlert.description || 'unknown'}
      Remediation：${selectedAlert.remediation || selectedAlert.solution || 'unknown'}
      CWE: ${selectedAlert.cwe || 'unknown'}
    Only return a one-sentence fix recommendation in plain English.
      `
  }

  // useEffect(() => {
  //   console.log("排序方式变了:", sortOrder);
  // }, [sortOrder]);

  // useEffect(() => {
  //   console.log('🧪 实际值:', sortedResults.map(r => r.risk || r.severity));
  // }, [sortedResults]);

  //tools 用Set去重
  const tools = [...new Set(data.map(item => item.tool))];

  return (
    <Container>
      <Tools>
        {tools.map((item, index) => (
          <ToolButton key={index} onClick={() => setActiveTool(item)} active={item == activeTool}>
            {item}
          </ToolButton>
        ))}
      </Tools>

      <DataList>
        <HeaderRow>
          <Cell>Type</Cell>
          <Cell>Name / CVE</Cell>
          <Cell>{
            // sortedResults[0].component ?
            //   <div>Component</div> : <div>CWE</div>
          }</Cell>
          <Cell>Severity
            <FilterBtn
              onClick={() => { changeOrder() }}
              title="sort">
              {sortOrder === 'asc' ? '👆' : '👇'}</FilterBtn>
          </Cell>

        </HeaderRow>

        {sortedResults.map((result, index) => (
          <AlertRow
            key={index}
            severity={(result.risk || result.severity || '').toLowerCase()}
            onClick={() => setSelectedAlert(result)}
          >
            <Cell>{result.type}</Cell>
            <Cell>{result.name || result.cve}</Cell>
            <Cell>{result.component || result.cwe}</Cell>
            <Cell>{displaySeverity(result.risk || result.severity)}</Cell>
          </AlertRow>
        ))}
      </DataList>

      {selectedAlert && (
        <Overlay onClick={() => setSelectedAlert(null)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={() => setSelectedAlert(null)}>✖</CloseBtn>
            <h2>{selectedAlert.name || selectedAlert.cve || 'Unnamed Alert'}</h2>
            <p><strong>Type:</strong> {selectedAlert.type}</p>
            <p><strong>CVE:</strong> {selectedAlert.cve}</p>
            <p><strong>Severity:</strong> {selectedAlert.risk || selectedAlert.severity}</p>
            {selectedAlert.component ?
              <div><strong>Component:</strong> {selectedAlert.component}</div> :
              <div><strong>Evidence:</strong> {selectedAlert.evidence || '-'}</div>
            }
            <p><strong>Description:</strong> {selectedAlert.description}</p>
            <p><strong>Remediation:</strong> {selectedAlert.solution || selectedAlert.remediation}</p>
            <p><strong>Reference:</strong> <a href={selectedAlert.reference || selectedAlert.uri}>{selectedAlert.reference || selectedAlert.uri}</a></p>

            {!selectedAlert.suggestion && (
              <AskButton onClick={() => generateSuggestion(selectedAlert)}> 🧠 Generate Fix Suggestion </AskButton>
            )}

            {selectedAlert.loading && <p>Generating suggestion...</p>}

            {selectedAlert.suggestion && (
              <SuggestionBox>
                <p>{selectedAlert.suggestion}</p>
              </SuggestionBox>
              
            )}
          </Modal>
        </Overlay>
      )}
    </Container>
  );
}

const Container = styled.div`
    flex: 1;
    background: #fefefe;
    border-radius: 10px;
    margin: 20px 0px;
  `;

const ToolButton = styled.div`
  padding: 8px 16px;
  margin-right: 10px;
  background-color: ${({ active }) => (active ? '#007bff' : '#e0e0e0')};
  color: ${({ active }) => (active ? 'white' : '#333')};
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
`;


const Tools = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  :hover {
    cursor: pointer
  };
  `

const DataList = styled.div`
  display: flex;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  flex-direction: column;
  gap: 8px;
  padding: 20px;
`

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 1fr ;
  font-weight: bold;
  background: #f3f3f3;
  padding: 10px 16px;
  border-radius: 6px;
`;

const AlertRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 1fr;
  padding: 10px 12px;
  background-color: ${({ severity }) => {
    switch (severity) {
      case 'high': return '#ffefef';
      case 'medium': return '#fff8e0';
      case 'low': return '#f3fce6';
      case 'informational': return '#e6f0ff';
      default: return '#f9f9f9';
    }
  }};
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #e8e8e8;
  }
`;

const Cell = styled.div`
  padding: 4px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 10px;
  color: white;
  background-color: ${({ severity }) => {
    switch (severity) {
      case 'high': return '#dc3545';         // red
      case 'medium': return '#fd7e14';       // orange
      case 'low': return '#ffc107';          // yellow
      case 'info': return '#17a2b8';         // blue
      case 'unknown': return '#6c757d';      // gray
      default: return '#adb5bd';             // light gray
    }
  }};
`;

const AlertItem = styled.div`
  background-color: ${({ severity }) => {
    switch (severity) {
      case 'high': return '#ff3b3b';
      case 'medium': return '#ffb700';
      case 'low': return '#faff00';
      case 'informational': return '#007bff';
      default: return '#f9f9f9';
    }
  }};
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  font-size: 14px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const FilterBtn = styled.button`
  padding-left: 5px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;


const AskButton = styled.button`
padding-left: 5px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`

const SuggestionBox = styled.div`
background:red;
`
  ;

export default AlertsGrid;
