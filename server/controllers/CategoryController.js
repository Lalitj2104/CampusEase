import Category from "../models/categoryModel.js";
import { Response } from "../utils/response.js";
import message from "../utils/message.js";

export const createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;

		const existing = await Category.findOne({ name });
		if (existing) {
			return Response(res, 400, false, "Category already exists.");
		}

		const category = await Category.create({ name, description });
		Response(res, 201, true, "Category created successfully", category);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getAllCategories = async (req, res) => {
	try {
		const categories = await Category.find().sort("name");
		Response(res, 200, true, "Categories fetched successfully", categories);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
