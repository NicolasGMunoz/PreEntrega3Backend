import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { PRIVATE_KEY_JWT } from "./config/constants.js";

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export const productsFilePath = join(__dirname, "./files/productos.json");
export const cartsFilePath = join(__dirname, "./files/carts.json");



export const createHash = (password) => {
  const salt = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  return salt
}

export const isValidPassowrd = (plainPassword, hashedPassword) => {
  const result = bcrypt.compareSync(plainPassword, hashedPassword)
  return result
}

export const generateToken = (user) => {
	const token = jwt.sign( {user} , PRIVATE_KEY_JWT, { expiresIn: '24h'});
  return token
};

export const authorization = (role) => {
  return async (req, res, next) => {
    if(req.user.role !== role) return res.status(403).send({ status: "error", message: "not permissions" })
    next()
  }
}
