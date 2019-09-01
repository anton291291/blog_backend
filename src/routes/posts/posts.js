
import express from "express";

import PostController from "../../controllers/PostController";

const Post = new PostController();

const router= express.Router();

router
  .get("/", Post.index)
  .get("/search/:query", Post.find)
  .post("/", Post.create);

router
  .delete("/:id", Post.delete)
  .put(":id", Post.update);

  export default router;
