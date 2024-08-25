import express from 'express';
import {updateUser, updateSuitableJobs, getUserTraits, getUsersPermission, updateUserRole } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();


router.post('/update/:id', verifyToken, updateUser);
router.post('/updateSuitableJobs/:id', verifyToken, updateSuitableJobs);
router.post('/getUserTraits',verifyToken,  getUserTraits);
router.get('/userspermission', verifyToken, getUsersPermission);
router.put('/updaterole/:userId', verifyToken, updateUserRole);
export default router;