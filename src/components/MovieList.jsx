import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import MovieModal from "./MovieModal";

// eslint-disable-next-line react/prop-types
const MovieList = ({ movies, onDelete, fetch }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const handleIsVisible = () => setIsVisible((prev) => !prev);
  return (
    <MainContainer>
      {/* eslint-disable-next-line react/prop-types */}
      {movies?.map((movie) => (
        <Container key={movie.id}>
          <img src={movie.image} alt="img" />
          <Content>
            <h1>{movie.title}</h1>
            <Button variant="contained" onClick={() => onDelete(movie.id)}>
              delete
            </Button>
            <Button variant="contained" onClick={handleIsVisible}>
              Edit
            </Button>
            <MovieModal
              isVisible={isVisible}
              onIsVisible={handleIsVisible}
              fetch={fetch}
              movie={movie}
            />
            <Button variant="outlined">
              <Link to={String(movie.id)}>Full</Link>
            </Button>
          </Content>
        </Container>
      ))}
    </MainContainer>
  );
};

export default MovieList;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  width: auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 1rem;
  gap: 2rem;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;
