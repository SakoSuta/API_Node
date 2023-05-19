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
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

// Routes pour Plan
router.get('/plans', PlanController.getAllPlans);
router.get('/plans/:id', PlanController.getPlanById);
router.post('/plans', PlanController.createPlan);
router.put('/plans/:id', PlanController.updatePlan);
router.delete('/plans/:id', PlanController.deletePlan);

// Routes pour Subscriptions
router.get('/subscriptions', SubscriptionsController.getAllSubscriptions);
router.get('/subscriptions/:id', SubscriptionsController.getSubscriptionById);
router.post('/subscriptions', SubscriptionsController.createSubscription);
router.put('/subscriptions/:id', SubscriptionsController.updateSubscription);
router.delete('/subscriptions/:id', SubscriptionsController.deleteSubscription);

// Routes pour PromoCode
router.get('/promo', PromoCodeController.getAllPromoCodes);
router.get('/promo/:id', PromoCodeController.getPromoCodeById);
router.post('/promo', PromoCodeController.createPromoCode);
router.put('/promo/:id', PromoCodeController.updatePromoCode);
router.delete('/promo/:id', PromoCodeController.deletePromoCode);

// Routes pour Post
router.get('/posts', PostController.getAllPosts);
router.get('/posts/:id', PostController.getPostById);
router.post('/posts', PostController.createPost);
router.put('/posts/:id', PostController.updatePost);
router.delete('/posts/:id', PostController.deletePost);

// Routes pour Category
router.get('/categories', CategoryController.getAllCategories);
router.get('/categories/:id', CategoryController.getCategoryById);
router.post('/categories', CategoryController.createCategory);
router.put('/categories/:id', CategoryController.updateCategory);
router.delete('/categories/:id', CategoryController.deleteCategory);

// Routes pour Game
router.get('/games', GameController.getAllGames);
router.get('/games/:id', GameController.getGameById);
router.post('/games', GameController.createGame);
router.put('/games/:id', GameController.updateGame);
router.delete('/games/:id', GameController.deleteGame);

export default router;