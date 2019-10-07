const express = "express";

const router = express.Router();

const db = require("./userDb.js");

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {
  db.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(500)
    .json({ error: "Could not get users" });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (id) {
    db.get(id)
      .then(users => {
        res.status(200).json(users);
      })
      .catch(() => {
        res.status(500).json({ message: "Could not get user" });
      });
  } else {
    res.status(404).json({ error: "User does not exist." });
  }
});

router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(user => {
      if (user) {
        res.status(201).json({ message: "User removed" });
      } else {
        res.status(404)({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "The user could not be removed." });
    });
});

router.put("/:id", (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
