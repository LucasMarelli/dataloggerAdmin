import { createContext, useState } from 'react';
import './App.css';
import CircularIndeterminate from './components/CirculaIndeterminated';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Devices from './components/devices';
import MyLineChart from './components/LineChart';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/DashBoard';
export const AppContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      <BrowserRouter basename='/'>
        <AppContext.Provider value={{ setIsLoading }}>
          <ResponsiveAppBar></ResponsiveAppBar>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/devices' element={<Devices />} />
          </Routes>
          <CircularIndeterminate active={isLoading} />
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
