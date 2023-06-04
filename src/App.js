import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Main from "./Components/Main/Main";
import Middle from "./Components/Main/Middle/Middle";
import SignUpForm from "./Components/SignUpForm/SignUpForm";
import LoginForm from "./Components/LoginForm/LoginForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="" element={<Main />}>
              <Route path="" element={<Middle />} />
            </Route>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
