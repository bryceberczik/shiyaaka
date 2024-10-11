import sequelize from "../config/connection.js";
import { UserFactory } from "./user.js";
import { CategoryFactory } from "./category.js";
import { ClothingFactory } from "./clothing.js";

const User = UserFactory(sequelize);
const Category = CategoryFactory(sequelize);
const Clothing = ClothingFactory(sequelize);

Category.hasMany(Clothing, {
    onDelete: 'CASCADE'
});

Clothing.belongsTo(Category);

export { sequelize, User, Category, Clothing };