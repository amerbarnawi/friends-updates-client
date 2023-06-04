import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Main from "./Components/Main/Main";
import Middle from "./Components/Main/Middle/Middle";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="" element={<Main />}>
              <Route path="" element={<Middle />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
