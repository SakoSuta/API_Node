const { Router } = require('express');
const UserController = require('../controllers/UserController');
const PlanController = require('../controllers/PlanController');
const SubscriptionsController = require('../controllers/SubscriptionsController');
const PromoCodeController = require('../controllers/PromoCodeController');
const PostController = require('../controllers/PostController');
const CategoryController = require('../controllers/CategoryController');
const GameController = require('../controllers/GameController');
const ContactController = require('../controllers/ContactController');
const AuthController = require('../controllers/AuthController');
const AuthenticateToken = require('../middleware/auth');

const router = Router();

// Routes pour Auth
router.post('/auth/register', AuthController.Register);
router.post('/auth/login', AuthController.Login);
router.post('/auth/logout', AuthenticateToken, AuthController.Logout);
router.get('/auth/me', AuthenticateToken, AuthController.InfoUser);
router.put('/auth/update/:uuid', AuthenticateToken, AuthController.UpUser);

// Routes pour User
router.get('/users', AuthenticateToken, UserController.getAllUsers);
router.get('/users/:uuid', AuthenticateToken, UserController.getUserByUuid);
router.post('/users', AuthenticateToken, UserController.createUser);
router.put('/users/:uuid', AuthenticateToken, UserController.updateUser);
router.delete('/users/:uuid', AuthenticateToken, UserController.deleteUser);

// Routes pour Plan
router.get('/plans', PlanController.getAllPlans);
router.get('/plans/:slug', PlanController.getPlanBySlug);
router.post('/plans', AuthenticateToken, PlanController.createPlan);
router.put('/plans/:slug', AuthenticateToken, PlanController.updatePlan);
router.delete('/plans/:slug', AuthenticateToken, PlanController.deletePlan);

// Routes pour Subscriptions
router.get('/subscriptions', AuthenticateToken, SubscriptionsController.getAllSubscriptions);
router.get('/subscriptions/:uuid', AuthenticateToken, SubscriptionsController.getSubscriptionByUuid);
router.post('/subscriptions', AuthenticateToken, SubscriptionsController.createSubscription);
router.put('/subscriptions/:uuid', AuthenticateToken, SubscriptionsController.updateSubscription);
router.delete('/subscriptions/:uuid', AuthenticateToken, SubscriptionsController.deleteSubscription);

// Routes pour PromoCode
router.get('/promo', AuthenticateToken, PromoCodeController.getAllPromoCodes);
router.get('/promo/:uuid', AuthenticateToken, PromoCodeController.getPromoCodeByUuid);
router.post('/promo', AuthenticateToken, PromoCodeController.createPromoCode);
router.put('/promo/:uuid', AuthenticateToken, PromoCodeController.updatePromoCode);
router.delete('/promo/:uuid', AuthenticateToken, PromoCodeController.deletePromoCode);

// Routes pour Post
router.get('/posts', PostController.getAllPosts);
router.get('/posts/:slug', PostController.getPostBySlug);
router.post('/posts', AuthenticateToken, PostController.createPost);
router.put('/posts/:slug', AuthenticateToken, PostController.updatePost);
router.delete('/posts/:slug', AuthenticateToken, PostController.deletePost);

// Routes pour Category
router.get('/categories', CategoryController.getAllCategories);
router.get('/categories/:slug', CategoryController.getCategoryBySlug);
router.post('/categories', AuthenticateToken, CategoryController.createCategory);
router.put('/categories/:slug', AuthenticateToken, CategoryController.updateCategory);
router.delete('/categories/:slug', AuthenticateToken, CategoryController.deleteCategory);

// Routes pour Game
router.get('/games', GameController.getAllGames);
router.get('/games/:slug', GameController.getGameBySlug);
router.post('/games', AuthenticateToken, GameController.createGame);
router.put('/games/:slug', AuthenticateToken, GameController.updateGame);
router.delete('/games/:slug', AuthenticateToken, GameController.deleteGame);

// Routes pour Contact
router.post('/contact', ContactController.ContactPage);

module.exports = router;