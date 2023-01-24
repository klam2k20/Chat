import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Chatpage from './Pages/Chatpage';
import Homepage from './Pages/Homepage';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<Chatpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
