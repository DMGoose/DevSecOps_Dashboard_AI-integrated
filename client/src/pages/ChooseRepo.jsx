import React, { useState } from 'react';

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
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Please enter GitHub Username and Repo name</h2>
      <input
        type="text"
        value={repo}
        placeholder="example：Username/RepoName"
        onChange={(e) => setRepo(e.target.value)}
        style={{ width: '300px', padding: '8px', fontSize: '16px' }}
      />
      <button onClick={handleLoad} style={{ marginLeft: '10px', padding: '8px 20px' }}>
        loading
      </button>
      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
    </div>
  );
}

export default ChooseRepo;