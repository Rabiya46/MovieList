import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";

const MovieInfo = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  useEffect(() => {
    try {
      const getMovie = async () => {
        const response = await axios.get(
          `https://worried-tux-toad.cyclic.app/api/v1/get-movie/${id}`
        );
        setMovie(response.data);
      };

      getMovie();
    } catch (error) {
      console.error(error.message);
    }
  }, [id]);

  return (
    <Contant>
      <img src={movie.image} alt="" />
      <p>
        <Span>Title:</Span>
        {movie.title}
      </p>
      <p>
        <Span>Author:</Span>
        {movie.author}
      </p>
      <p>
        <Span>Date:</Span>
        {movie.createdAt}
      </p>
      <Link to=".." relative="path">
        Go back
      </Link>
    </Contant>
  );
};
export default MovieInfo;

const Contant = styled.div`
  border: 2px solid;
  padding: 20px;
  font-size: 20px;
  margin: 30px 30px;
  background-color: #4576e2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Span = styled.span`
  color: black;
  font-weight: bold;
`;
