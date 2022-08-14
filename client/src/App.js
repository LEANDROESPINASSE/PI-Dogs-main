import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import Detail from "./Components/Detail/Detail";
import CreateDog from "./Components/Creation/Create"
import About from "./Components/About/About";
//import { GlobalStyle } from "./globalStyles";


function App() {
  return (
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/dogs/:id" element={<Detail />} />
          <Route path="/create" element={<CreateDog />} />
        </Routes>
      </div>
  );
}

export default App;