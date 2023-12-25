import React, { useState, useEffect } from "react";
import axios from "axios";
// import { v4 as uuid } from "uuid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "styled-components";
import MovieList from "./MovieList";
import MovieHeader from "./MovieHeader";

const initialState = {
  title: "",
  author: "",
  image: "",
  id: "",
};

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  console.log(movies);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "https://worried-tux-toad.cyclic.app/api/v1/get-movies"
      );

      if (!response.data.message) {
        setMovies(response.data);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (movie.title && movie.author) {
      try {
        await axios.post(
          "https://worried-tux-toad.cyclic.app/api/v1/send-movie/",
          movie
        );

        fetchMovies();

        setMovie(initialState);
      } catch (error) {
        console.error(error.reponse.data.message);
      }
    }
  };

  const deleteMovie = async (id) => {
    console.log(id);
    await axios
      .delete(`https://worried-tux-toad.cyclic.app/api/v1/delete-movie/${id}`)
      .then(() => {
        fetchMovies();
      });
  };

  return (
    <>
      <MovieHeader />
      <Container>
        <StyleForm onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            type="text"
            value={movie.title}
            onChange={(e) => setMovie({ ...movie, title: e.target.value })}
          />
          <TextField
            id="outlined-basic"
            label="Author"
            variant="outlined"
            type="Author"
            value={movie.author}
            onChange={(e) => setMovie({ ...movie, author: e.target.value })}
          />
          <TextField
            id="outlined-basic"
            label="IMG"
            variant="outlined"
            type="IMG"
            value={movie.image}
            onChange={(e) => setMovie({ ...movie, image: e.target.value })}
          />
          <Button variant="contained" type="submit">
            Add
          </Button>
        </StyleForm>
        <MovieList movies={movies} onDelete={deleteMovie} fetch={fetchMovies} />
      </Container>
    </>
  );
};

export default MovieApp;

const StyleForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Loading = styled.div`
  font-size: 50px;
  background-color: yellow;
  padding: 20px;
  border-radius: 20px;
  width: 100%;
`;
