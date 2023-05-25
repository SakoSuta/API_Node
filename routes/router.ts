import { Router } from 'express';
import UserController from '../controllers/UserController';
import PlanController from '../controllers/PlanController';
import SubscriptionsController from '../controllers/SubscriptionsController';
import PromoCodeController from '../controllers/PromoCodeController';
import PostController from '../controllers/PostController';
import CategoryController from '../controllers/CategoryController';
import GameController from '../controllers/GameController';

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
router.get('/subscriptions', SubscriptionsController.getAllSubscriptions);
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

export default router;