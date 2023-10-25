import express from "express";
import morgan from "morgan";
import cors from "cors";

import {
  getAllMovies,
  findMovieById,
  addMovie,
  updateMovie,
  deleteMovieById,
} from "./db.js";

const app = express();
// allow access from any domain
app.use(cors());
// logs
app.use(morgan("tiny"));
// allow parsing of request body
app.use(express.json());

// READ
app.get("/movies", (req, res) => {
  res.json(getAllMovies());
});

// READ
app.get("/movies/:id", (req, res, next) => {
  const movie = findMovieById(req.params.id);
  if (!movie) {
    return next({ code: 404, message: "Movie not found for id" });
  }
  res.json(movie);
});

// UPDATE
app.put("/movies/:id", (req, res, next) => {
  if (!req.body.title || !req.body.year) {
    return next({
      code: 400,
      message: "Movie payload should have title and year",
    });
  }
  const m = updateMovie({
    id: req.params.id,
    title: req.body.title,
    year: req.body.year,
  });

  if (!m) {
    return next({
      code: 400,
      message: "Failed to update movie with id " + req.params.id,
    });
  }

  return res.json(m);
});

// DELETE
app.delete("/movies/:id", (req, res, next) => {
  const m = deleteMovieById(req.params.id);
  if (!m) {
    return next({
      code: 400,
      message: "Failed to delete movie with id " + req.params.id,
    });
  }
  res.json(m);
});

// CREATE
app.post("/movies", (req, res, next) => {
  if (!req.body.title || !req.body.year) {
    return next({
      code: 400,
      message: "Movie payload should have title and year",
    });
  }

  const newMovie = addMovie({
    title: req.body.title,
    year: req.body.year,
  });

  return res.json(newMovie);
});

// 404
app.use((req, res, next) => {
  next({
    code: 404,
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  if (err.code && err.code) {
    res.status(err.code);
  }
  if (err.message && err.message) {
    res.send({ message: err.message });
    return;
  }

  return res.status(500).send({
    message: "Unknown error",
  });
});

app.listen(5476, () => {
  console.log("Server running on port 5476");
});
