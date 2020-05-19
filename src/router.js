import { Router } from 'express';
import * as UserController from './controllers/user_controller';
import { requireAuth, requireSignin } from './services/passport';
import * as Posts from './controllers/post_controller';


const router = Router();

// your routes will go here
router.route('/')
  .get((req, res) => { res.json({ message: 'welcome to our blog api!' }); });

router.route('/signup')
  .get((req, res) => { res.json({ message: 'sign up!' }); })
  .post(UserController.signup);

router.route('/signin')
  .get((req, res) => { res.json({ message: 'sign in!' }); })
  .post(requireSignin, UserController.signin);

router.route('/posts')
  .post(requireAuth, Posts.createPost)
  .get(Posts.getPosts);

router.route('/posts/:id')
  .get(Posts.getPost)
  .put(requireAuth, Posts.updatePost)
  .delete(requireAuth, Posts.deletePost);


export default router;
