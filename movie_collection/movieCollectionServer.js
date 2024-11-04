// Import the Express framework
const express = require("express");
// Create an instance of Express
const app = express();

// Define the port number for the server
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

//Default Data Structure
const movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
  { id: 2, title: "The Matrix", director: "The Wachowskis", year: 1999 },
  { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019 },
];

//Creating Routes
//1st Route to get the homepage, and listing all movies in HTML format
app.get("/", (req, res) => {
  let movieList = "<h1>Movies</h1>";
  movieList += "<ul>"; // starting the unordered list
  //Loop through each movie and add it to the list
  movies.forEach((movie) => {
    movieList += `<li>Movie Title: ${movie.title}, Directed by: ${movie.director}, Released year: ${movie.year}</li>`;
  });
  movieList += "</ul>"; // ending the unordered list
  res.send(movieList); // send HTML list back to the client
});

// making route to get a specific movie by ID
app.get("/movies/:id", (req, res) => {
  // finding the movie which matches with the ID from the request ID
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  if (movie) {
    // if found the movies, send as JSon response
    res.json(movie);
  } else {
    // if not, send a 404 error
    res.status(404).send("<b>Movie ID is invalid!</b>");
  }
});

// Creating a new movie
app.post("/movies", (req, res) => {
  const { id, title, director, year } = req.body; // Structuring the new movie details from request
  if (!id || !title || !director || !year) {
    return res.status(400).send("<b>Movie is not available</b>"); // if requirements are not provided, send a 400 error
  }
  const newMovie = { id, title, director, year }; // creating a newMovie object
  movies.push(newMovie); // adding the new movie to movies array
  res.status(201).json(newMovie); // send 201 status and respond
});

//get all movies into JSon format
app.get("/movies", (req, res) => {
  res.json(movies);
});

//start the server by the defined port 3000
app.listen(PORT, () => {
  console.log(
    `My Server is currently running on the PORT 3000, waiting for the request!`
  );
});
