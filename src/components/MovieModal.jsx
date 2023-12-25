import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Button, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const MovieModal = ({ isVisible, onIsVisible, fetch, movie }) => {
  const [editedMovie, setEditedMovie] = React.useState(movie);

  const updateMovie = async (id) => {
    await axios
      .put(
        `https://worried-tux-toad.cyclic.app/api/v1/update-movie/${id}`,
        editedMovie
      )
      .then(() => {
        fetch();
        onIsVisible();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Modal
        open={isVisible}
        onClose={onIsVisible}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            type="Title"
            value={editedMovie.title}
            onChange={(e) =>
              setEditedMovie({ ...editedMovie, title: e.target.value })
            }
          />
          <TextField
            type="Author"
            value={editedMovie.author}
            onChange={(e) =>
              setEditedMovie({ ...editedMovie, author: e.target.value })
            }
          />
          <TextField
            type="IMG"
            value={editedMovie.image}
            onChange={(e) =>
              setEditedMovie({ ...editedMovie, image: e.target.value })
            }
          />

          <Button onClick={() => updateMovie(movie.id)}>Save</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default MovieModal;
