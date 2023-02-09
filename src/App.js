import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
// import Offer from "./pages/Offer";

function App() {
  // console.log(data);
  return (
    <Router>
      {/* Qqchose ici apparait partout */}
      <Header />
      <Routes>
        {/* Pour chaque route, je précise son chemin et le composant qu'elle doit afficher */}
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
