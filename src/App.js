import './App.css';
import {Route, Routes} from "react-router-dom"
import Home from './Components/Home/home';
import Details from './Components/Details/details';
import { useState } from 'react';

function App() {
  let [dataArray, setDataArray] = useState([])
    
  return (
    <Routes>
      <Route path="/" element={<Home dataArray={dataArray} setDataArray={setDataArray}/>} />
      <Route path="/details/:id" element={<Details/>} />
    </Routes>
  );
}

export default App;
