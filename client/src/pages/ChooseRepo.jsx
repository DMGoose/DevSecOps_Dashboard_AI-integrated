import React, { useState } from 'react';
import styled from 'styled-components';

function ChooseRepo({ onRepoSelected }) {
  const [repo, setRepo] = useState('');
  const [error, setError] = useState(null);

  const handleLoad = async () => {
    const url = `https://raw.githubusercontent.com/${repo}/main/report-template/public/data/merged-security-reports.json`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Report not found, the repository does not exist or the file path is wrong');
      const data = await res.json();
      onRepoSelected(repo, data); // 传回parent组件
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container>
    <Title>Please enter GitHub Username and Repo name</Title>
    <Input
      type="text"
      value={repo}
      placeholder="example：Username/RepoName"
      onChange={(e) => setRepo(e.target.value)}
    />
    <LoadButton onClick={handleLoad}>Load</LoadButton>
    {error && <ErrorMsg>❗ {error}</ErrorMsg>}
  </Container>
  );
}

const Container = styled.div`
  text-align: center;
  padding: 50px;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: 600;
  color: #222;
`;

const Input = styled.input`
  width: 320px;
  padding: 10px 14px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border-color: #0077cc;
  }
`;

const LoadButton = styled.button`
  margin-left: 12px;
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 8px;
  background-color: #0077cc;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #005fa3;
  }
`;

const ErrorMsg = styled.p`
  color: #d9534f;
  margin-top: 16px;
  font-size: 14px;
`;


export default ChooseRepo;