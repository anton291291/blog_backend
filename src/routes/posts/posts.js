
import express from "express";

import PostController from "../../controllers/PostController";

const Post = new PostController();

const router= express.Router();

router
  .get("/", Post.index)
  .post("/", Post.create);

router
  .get("/:id", Post.read)
  .delete("/:id", Post.delete)
  .put(":id", Post.update);

  export default router;
