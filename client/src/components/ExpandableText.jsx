import React,{useState, useEffect} from 'react';
import styled from 'styled-components';

function ExpandableText({text, maxChars = 300}){

    const [expanded,setExpanded] = useState(false); //展开 by default
    const shouldTruncate = text.length > maxChars;

    const displayedText = expanded? text:text.slice(0,maxChars) + (shouldTruncate ? '...' : '');

    return(
        <Wrapper>
            <pre>{displayedText}</pre>
            {shouldTruncate && (
                <ToggleBtn onClick = {()=>setExpanded(!expanded)}>
                    {expanded? 'Show Less ▲' : 'Show More ▼'}
                </ToggleBtn>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.div`
  background: #f4f4f4;
  padding: 10px;
  margin-top: 8px;
  border-radius: 6px;
  max-height: 400px;
  overflow-y: auto;
  font-size: 14px;
  white-space: pre-wrap;
  word-break: break-word;
`;

const ToggleBtn = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default ExpandableText;