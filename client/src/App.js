
import React,{useState} from'react';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import ChooseRepo from './pages/ChooseRepo';

function App() {
  const [reportData, setReportData] = useState(null);
  const [repoName, setRepoName] = useState('');

  const handleRepoSelected = (repo, data) => {
    setRepoName(repo);
    setReportData(data);
  };


  return (
    <div>
      {!reportData ? (
        <ChooseRepo onRepoSelected={handleRepoSelected} />
      ) : (
        <Home reportData={reportData} repo={repoName} />
      )}
    </div>
  );

  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="*"element={<NotFound/>}></Route>  
  //       <Route path="/" element={<Home/>}></Route>  
  //     </Routes>
  //   </Router>
  // )
}

export default App;
