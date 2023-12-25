import { Route, Routes } from "react-router-dom";
import MovieApp from "../components/MovieApp";
import MovieInfo from "../components/MovieInfo";

const RouterApp = () => {
  return (
    <Routes>
      <Route path="/" element={<MovieApp />} />
      <Route path="/:id" element={<MovieInfo />} />
    </Routes>
  );
};

export default RouterApp;
