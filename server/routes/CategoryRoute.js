import express from 'express';
import { createCategory, getAllCategories } from '../controllers/CategoryController.js';

const CategoryRoute = express.Router();

CategoryRoute.post("/new",createCategory);
CategoryRoute.get("/all",getAllCategories);
export default CategoryRoute;