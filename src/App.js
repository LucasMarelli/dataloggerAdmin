import { createContext, useState } from 'react';
import './App.css';
import CircularIndeterminate from './components/CirculaIndeterminated';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Devices from './components/devices';
import MyLineChart from './components/LineChart';
export const AppContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      <AppContext.Provider value={{ setIsLoading }}>
        <ResponsiveAppBar></ResponsiveAppBar>
        <MyLineChart></MyLineChart>
        {/* <Devices /> */}
        <CircularIndeterminate active={isLoading} />
      </AppContext.Provider>
    </>
  );
}

export default App;
