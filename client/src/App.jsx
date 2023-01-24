import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Chatpage from './components/Chatpage';
import Homepage from './components/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chat" element={<Chatpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
