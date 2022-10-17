import './App.css';
import Cards from './components/Cards';
import SearchDates from './components/SearchDates';
import SearchMarsRover from './components/SearchMarsRover';
import RenovarApi from './features/apikey/RenovarApi';
import { BrowserRouter, Router, Route, Routes, Link,  } from 'react-router-dom'
import SatelliteGraph from './components/SatelliteGraph';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <ul>
            <Link to={'/'}><li>Mars Rover</li></Link>
            <Link to={'/change-Api-key'} ><li>Change Api key</li></Link>
            <Link to={'/satellites'}>Satellites</Link>
          </ul>
        </header>
        <Routes>
          <Route path='/change-Api-Key' element={<RenovarApi/>} />
          <Route path='/' element={
            <>
              <SearchMarsRover/>
              <SearchDates/>
              <Cards/>
            </>
        } />
          <Route path='/satellites' element={<SatelliteGraph/>} />
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
