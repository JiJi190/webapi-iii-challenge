const express = require("express");

const userRouter = require("./users/userRouter.js");

const postRouter = require("./posts/postRouter");

const server = express();

server.use(express.json());

server.use("/api/users", userRouter);

server.use("/api/posts", postRouter);

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`)
// });

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get(
      "Origin"
    )}`
  );
  next();
}

server.use(logger);

// Users CRUD

server.post("/api/users", (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({ message: "Could not add user" });
    });
});

server.delete("/api/users/:id", (req, res) => {
  Users.remove(req.params.id)
    .then(count => {
      if (count && count > 0) {
        res.status(200).json({ message: "User deleted" });
      } else {
        res.status(404).json({ message: "User does not exist" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Deletion failed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "Input User Name" });
  } else {
    Users.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: "User does not exist" });
        }
      })
      .catch(() => {
        res.status(500).json({ message: "Could not update" });
      });
  }
});

module.exports = server;
