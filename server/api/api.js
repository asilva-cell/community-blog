const express = require("express");
const Post = require("../models/Posts");
const Router = express.Router;
const { basicAuth, jwtAuth, createJWT } = require("./auth");

const setupV1Routes = (apiRouter) => {
  
    async function findAllPosts(request, response) {
    try {
      const posts = await Post.find().sort({ date: -1 });
      response.json(posts);
    } catch (err) {
      response.status(500).send("Server Error");
    }
  }

  async function addNewPost(request, response) {
    let post = new Post(request.body);
    await post.save();
    response.sendStatus(200);
  }

  async function clearAllPosts(request, response) {
    try {
      const posts = await Post.find().remove({});
      response.status(200).json(posts);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }

  async function deletePost(request, response) {
    try {
      const post = await Post.find({ uid: request.body.uid }).deleteOne({});
      response.status(200).json(post);
    } catch (err) {
      response.status(500).send("Server Error");
    }
  }

  async function updatePost(request, response) {
    try {
      const post = await Post.find({ uid: request.body.uid }).updateOne({
        postText: request.body.postText,
        author: request.body.author,
        postDate: request.body.postDate,
        uid: request.body.uid,
        comments: request.body.comments,
      });
      response.sendStatus(200);
    } catch (err) {
      response.status(500).send("Server Error");
    }
  }

  // Routing
  const v1Router = Router();
  v1Router.get("/posts", findAllPosts);
  v1Router.post("/addPost", jwtAuth, addNewPost);
  v1Router.post("/clear", jwtAuth, clearAllPosts);
  v1Router.post("/delete", jwtAuth, deletePost);
  v1Router.post("/updatePost", updatePost);
  v1Router.post("/login", basicAuth, createJWT);
  apiRouter.use("/v1", v1Router);
};

const apiRouter = Router();
setupV1Routes(apiRouter);

module.exports = apiRouter;
