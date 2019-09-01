import PostModel from "../models/Post";

class PostController {

  index (req,res) {
    PostModel.find()
    .then((posts) => {
      if (!posts) {
      return res.send(err);
      }
      res.json(posts);
    });
  };

  create (req,res) {
    const data= req.body;

    const post = new PostModel(
      {
        title: data.title,
        text: data.text,
        imageUrl: data.imageUrl
      }
    );
    post.save()
    .then(() => {
      res.json({status:"ok"});
    });
  };

  find (req,res) {
    const query = req.params.query;

    PostModel.find( {
    $text: {
        $search: query
    }
    })
    .then((post) => {
      if (!post) {
        res.json({error: "not found"});
      }
        res.json(post);
    });
  };

  update  (req,res) {
    PostModel
    .findByIdAndUpdate({_id: req.params.id}, {$set: req.body})
    .then(() => {
      res.json({status: "updated"})
    })
    .catch((err) => {
      res.send(err);
    });
  };

  delete (req,res) {
    PostModel.deleteOne({
      _id: req.params.id
    })
    .then(post => {
      if(post) {
      res.json({status: "deleted"});
      } else {
      res.json({status: "error"});
      };
    });
  }

};

export default PostController;
