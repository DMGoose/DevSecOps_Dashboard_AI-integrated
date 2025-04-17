import { useState } from 'react';
import styled from "styled-components"

function FixSuggestion({ suggestion }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(suggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <SuggestionBox>
      <CopyButton onClick={handleCopy}>📋</CopyButton>
      {suggestion}
      {copied && <CopiedTip>✅ Copied!</CopiedTip>}
    </SuggestionBox>
  );
}


export default FixSuggestion;

const SuggestionBox = styled.div`
  position: relative;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px 40px 16px 16px; /* 留出右上角空间 */
  margin-top: 10px;
  font-size: 15px;
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
`;

const CopyButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #666;
  transition: color 0.2s;

  &:hover {
    color: #111;
  }
`;

const CopiedTip = styled.div`
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 12px;
  color: #0077cc;
`;

