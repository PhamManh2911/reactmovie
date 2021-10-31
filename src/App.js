import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import {GlobalStyle} from "./GlobalStyle"
import Movie from "./components/Movie"
import NotFoundPage from "./components/NotFoundPage"
import Login from "./components/Login"
import UserProvider from "./components/User"

function App() {
  return (
    <Router>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/:movieId" element={<Movie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <GlobalStyle />
      </UserProvider>
    </Router>
  );
}

export default App;
