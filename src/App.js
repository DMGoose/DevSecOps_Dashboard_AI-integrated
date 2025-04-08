
import React from'react';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*"element={<NotFound/>}></Route>  
        <Route path="/" element={<Home/>}></Route>  
      </Routes>
    </Router>
  )
}

export default App;
