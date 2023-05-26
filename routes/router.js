const { Router } = require('express');
const UserController = require('../controllers/UserController');
const PlanController = require('../controllers/PlanController');
const SubscriptionsController = require('../controllers/SubscriptionsController');
const PromoCodeController = require('../controllers/PromoCodeController');
const PostController = require('../controllers/PostController');
const CategoryController = require('../controllers/CategoryController');
const GameController = require('../controllers/GameController');

const router = Router();

// Routes pour User
router.get('/users', UserController.getAllUsers);
router.get('/users/:uuid', UserController.getUserByUuid);
router.post('/users', UserController.createUser);
router.put('/users/:uuid', UserController.updateUser);
router.delete('/users/:uuid', UserController.deleteUser);

// Routes pour Plan
router.get('/plans', PlanController.getAllPlans);
router.get('/plans/:slug', PlanController.getPlanBySlug);
router.post('/plans', PlanController.createPlan);
router.put('/plans/:slug', PlanController.updatePlan);
router.delete('/plans/:slug', PlanController.deletePlan);

// Routes pour Subscriptions
router.get('/', SubscriptionsController.getAllSubscriptions);
router.get('/subscriptions/:uuid', SubscriptionsController.getSubscriptionByUuid);
router.post('/subscriptions', SubscriptionsController.createSubscription);
router.put('/subscriptions/:uuid', SubscriptionsController.updateSubscription);
router.delete('/subscriptions/:uuid', SubscriptionsController.deleteSubscription);

// Routes pour PromoCode
router.get('/promo', PromoCodeController.getAllPromoCodes);
router.get('/promo/:id', PromoCodeController.getPromoCodeById);
router.post('/promo', PromoCodeController.createPromoCode);
router.put('/promo/:id', PromoCodeController.updatePromoCode);
router.delete('/promo/:id', PromoCodeController.deletePromoCode);

// Routes pour Post
router.get('/posts', PostController.getAllPosts);
router.get('/posts/:slug', PostController.getPostBySlug);
router.post('/posts', PostController.createPost);
router.put('/posts/:slug', PostController.updatePost);
router.delete('/posts/:slug', PostController.deletePost);

// Routes pour Category
router.get('/categories', CategoryController.getAllCategories);
router.get('/categories/:slug', CategoryController.getCategoryBySlug);
router.post('/categories', CategoryController.createCategory);
router.put('/categories/:slug', CategoryController.updateCategory);
router.delete('/categories/:slug', CategoryController.deleteCategory);

// Routes pour Game
router.get('/games', GameController.getAllGames);
router.get('/games/:slug', GameController.getGameBySlug);
router.post('/games', GameController.createGame);
router.put('/games/:slug', GameController.updateGame);
router.delete('/games/:slug', GameController.deleteGame);

module.exports = router;