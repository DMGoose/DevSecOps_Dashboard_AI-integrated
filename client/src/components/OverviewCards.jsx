import styled from 'styled-components';
import React, { useEffect } from 'react';

function OverviewCards({ data, repo }) {


  //遍历tools并且去重
  const tools = [...new Set(data.map(item => item.tool))];


  //找到trivy 的 target 并且进行处理
  const findTarget = () => {
    const tool = data.find(item => item.tool === 'Trivy');
    const target = tool.target;
    //"file:///home/runner/work/WebGoat-T/WebGoat-T/" 要处理这个字符串
    const arr = target.split('/').filter(Boolean);
    console.log(arr);
    return arr[arr.length - 1];
  }

  const toolStats = data.map(item => ({
    tool: item.tool,
    type: item.type,
    count: item.results.length
  }));

  const sastStats = toolStats.filter(item => item.type.includes('SAST'));
  const scaStats = toolStats.filter(item => item.type.includes('SCA'));
  const dastStats = toolStats.filter(item => item.type.includes('DAST'));

  useEffect(() => {
    console.log('我是overview里的data', data)

  }, [])

  return (
    <Wrapper>
      <Card>
        <Title>Repo</Title>
        {/* <Value>{findTarget()}</Value> */}
        <StatItem>{repo}</StatItem>
      </Card>
      <Card>
        <Title>Time</Title>
        <StatItem>{data[0].timestamp}</StatItem>
      </Card>
      <Card>
        <Title>Tools</Title>
        <Value>
          {tools.map((item, index) => (
            <StatItem key={index}>
              {item}
            </StatItem>
          ))}
        </Value>
      </Card>
      <Card className='wide'>
        <Title>Overall</Title>
        <Value>
          {toolStats.map((item, index) => (
            <StatItem key={index}>
              <span style={{ fontWeight: 500 }}>{item.tool} {item.type}</span>
              <span>{item.count} errors </span>
            </StatItem>
          ))}

        </Value>
      </Card>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
background-color:rgb(230, 230, 230);
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  font-size: 16px;

  &.wide {
    grid-column: span 2;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  font-weight: bold;
  color: #444;
`;

const Value = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px 24px;
  color: #444;
  font-size: 15px;
  line-height: 1.5;
`;

const StatItem = styled.div`
  background-color:rgb(239, 240, 241);
  border-radius: 8px;
  padding: 6px 10px;
  margin-top: 5px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #333;
`;

export default OverviewCards;

