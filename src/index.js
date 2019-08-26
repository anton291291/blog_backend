import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";

import PostController from "./controllers/PostController";

const Post = new PostController();

mongoose.connect('mongodb://superuser:rdflhjrjgnth@localhost:27017/blog?authSource=admin', {useNewUrlParser: true});


const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/posts", Post.index);

app.get("/posts/:id", Post.read);

app.post("/posts", Post.create);

app.delete("/posts/:id", Post.delete);

app.put("/posts/:id", Post.update);

app.listen(4000,() => {
  console.log("server started at 4000 port")
}
);
