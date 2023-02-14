import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
// fontawsome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faMagnifyingGlass,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import Payement from "./pages/Payement";
library.add(faMagnifyingGlass, faArrowUp, faArrowDown, faPlus);
// import Offer from "./pages/Offer";

function App() {
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [querySearch, setQuerySearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);
  const [priceSearchBar, setPriceSearchBar] = useState(true);
  // console.log(data);
  return (
    <Router>
      {/* Qqchose ici apparait partout */}
      <Header
        signupModal={signupModal}
        setSignupModal={setSignupModal}
        loginModal={loginModal}
        setLoginModal={setLoginModal}
        querySearch={querySearch}
        setQuerySearch={setQuerySearch}
        sort={sort}
        setSort={setSort}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        priceSearchBar={priceSearchBar}
      />
      <Routes>
        {/* Pour chaque route, je précise son chemin et le composant qu'elle doit afficher */}
        <Route
          path="/"
          element={
            <Home
              querySearch={querySearch}
              sort={sort}
              priceMin={priceMin}
              priceMax={priceMax}
              setPriceSearchBar={setPriceSearchBar}
            />
          }
        />
        <Route
          path="/offer/:id"
          element={<Offer setPriceSearchBar={setPriceSearchBar} />}
        />
        <Route
          path="/signup"
          element={<SignUp setPriceSearchBar={setPriceSearchBar} />}
        />
        <Route
          path="/login"
          element={
            <Login
              setSignupModal={setSignupModal}
              setPriceSearchBar={setPriceSearchBar}
            />
          }
        />
        <Route
          path="/publish"
          element={<Publish setPriceSearchBar={setPriceSearchBar} />}
        />

        <Route
          path="/payement"
          element={<Payement setPriceSearchBar={setPriceSearchBar} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
