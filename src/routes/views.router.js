import { Router } from "express";
import { productsFilePath } from "../utils.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { handlePolicies } from "../middlewares/auth.js";
import { passportCall } from "../config/passport.config.js";
import { generateCustomResponse } from "../middlewares/responses.js";
import {
	cartDetail,
	login,
	productDetail,
	productsView,
	profile,
	realTimeProductsView,
	register
} from "../controllers/views.controller.js";

const router = Router();



router
	.get(
		"/",
		passportCall(passportStrategiesEnum.JWT),
		handlePolicies([accessRolesEnum.USER, accessRolesEnum.ADMIN]),
		generateCustomResponse,
		profile
	)
	.get(
		"/realtimeproducts",
		passportCall(passportStrategiesEnum.JWT),
		handlePolicies([accessRolesEnum.USER, accessRolesEnum.ADMIN]),
		generateCustomResponse,
		realTimeProductsView
	)
	.get(
		"/products",
		passportCall(passportStrategiesEnum.JWT),
		handlePolicies([accessRolesEnum.USER, accessRolesEnum.ADMIN]),
		generateCustomResponse,
		productsView
	)
	.get(
		"/products/:pid",
		passportCall(passportStrategiesEnum.JWT),
		handlePolicies([accessRolesEnum.USER, accessRolesEnum.ADMIN]),
		generateCustomResponse,
		productDetail
	)
	.get(
		"/carts/detail",
		passportCall(passportStrategiesEnum.JWT),
		handlePolicies([accessRolesEnum.USER]),
		generateCustomResponse,
		cartDetail
	)
	.get(
		"/register",
		passportCall(passportStrategiesEnum.NOTHING),
		handlePolicies([accessRolesEnum.PUBLIC]),
		generateCustomResponse,
		register
	)
	.get(
		"/login",
		passportCall(passportStrategiesEnum.NOTHING),
		handlePolicies([accessRolesEnum.PUBLIC]),
		generateCustomResponse,
		login
	);

export default router;

