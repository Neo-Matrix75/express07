require("dotenv").config();

const express = require("express");
const { hashPassword, verifyPassword, verifyToken } = require("./auth");
const userHandlers = require("./userHandlers");
const app = express();
const port = process.env.APP_PORT ?? 5000;
const welcome = (req, res) => {
    res.send("Welcome to my favourite movie list");
};
const movieHandlers = require("./movieHandlers");
app.use(express.json());
app.get("/", welcome);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

app.post("/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);
app.post("/api/users", hashPassword, userHandlers.postUser);

app.use(verifyToken);

app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", userHandlers.updateUser);
app.post("/api/movies", movieHandlers.postMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", userHandlers.deleteUser);

app.listen(port, (err) => {
    if (err) {
        console.error("Something bad happened");
    } else {
        console.log(`Server is listening on ${port}`);
    }
});
