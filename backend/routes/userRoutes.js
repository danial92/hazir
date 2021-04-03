import express from "express";
const router = express();
import { authUser, registerUser, userProfile, updateProfile, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(protect, admin, getUsers)
router.post('/login', authUser);
router.post('/register', registerUser)
router.route('/profile').get(protect, userProfile).put(protect, updateProfile)
router.route("/:id").delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

export default router;