import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";

import passport from 'passport';
import users from './routes/autorization/user';
import passFunc from './passport';

import posts from './routes/posts/posts';

mongoose.connect('mongodb://superuser:rdflhjrjgnth@localhost:27017/blog?authSource=admin', {useNewUrlParser: true})
.then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(passport.initialize());
passFunc(passport);

app.use('/api/users', users);
app.use("/posts", posts);



app.listen(4000,() => {
  console.log("server started at 4000 port")
}
);
