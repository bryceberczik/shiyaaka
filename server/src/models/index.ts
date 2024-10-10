import sequelize from "../config/connection.js";
import { UserFactory } from "./user.js";
import { CategoryFactory } from "./category.js";

const User = UserFactory(sequelize);
const Category = CategoryFactory(sequelize);
export { User, Category };