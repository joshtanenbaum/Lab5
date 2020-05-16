import Post from '../models/post_model';


export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.coverUrl = req.body.coverUrl;
  post.save()
    .then((result) => {
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


export const getPosts = (req, res) => {
  Post.find({})
    .then((posts) => {
      res.send(posts); 
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


export const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.send(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


export const deletePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json({ message: 'Post deleted!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


export const updatePost = (req, res) => {
  Post.update({ _id: req.params.id }, { title: req.body.title, tags: req.body.tags, content: req.body.content, coverUrl: req.body.coverUrl })
    .then((result) => {
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};