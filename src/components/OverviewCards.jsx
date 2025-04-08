import styled from 'styled-components';
import React, { useEffect } from 'react';

function OverviewCards({ data }) {


  //遍历tools并且去重
  const tools = [...new Set(data.map(item => item.tool))];
  // 

  const toolStats = data.map(item => ({
    tool: item.tool,
    type: item.type,
    count: item.results.length
  }));

  return (
    <Wrapper>
      <Card>
        <Title>Site</Title>
        <Value>--</Value>
      </Card>
      <Card>
        <Title>Time</Title>
        <Value>--</Value>
      </Card>
      <Card>
        <Title>Tools</Title>
        <Value>
          {tools.map((item, index) => (
            <div key={index}>
              {item}
            </div>
          ))}
        </Value>
      </Card>
      <Card>
        <Title>Overall</Title>
        <Value>
          {toolStats.map((item, index) => (
            <div key={index}>
              <span>{item.tool}:</span> {item.count} {item.type}
            </div>
          ))}

        </Value>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px 0;
  flex-wrap: wrap;
`;

const Card = styled.div`
  box-sizing: border-box;
  flex: 1;
  min-width: 200px;
  height: 100px;
  background-color: #eaf1f9;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  font-size: 25px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  font-weight: bold;
  color: #333;
`;

const Value = styled.div`
  font-size: 18px;
  color: #111;
`;

export default OverviewCards;

