const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql");
const app = express();
const db = require("./config/keys").mongoURI;

const User = require("./models/User");
const Post = require("./models/Post");
const schema = require("./schema/schema");

mongoose
  .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// const router = express.Router();

// const createNewPost = router.post("/new", (req, res) => {
//   // remember to import your Post model from Mongoose!
//   const newPost = new Post({
//     title: req.body.title,
//     body: req.body.body,
//     date: req.body.date,
//     author: req.body.author,
//   });

//   newPost
//     .save()
//     .then((savedPost) => res.json(savedPost))
//     .catch((err) => console.log(err));
// });

// app.use("/posts", createNewPost);

app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("Server is running on port 5000"));
