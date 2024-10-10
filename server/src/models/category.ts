import { DataTypes, Model, Optional, Sequelize } from "sequelize";

interface CategoryAttributes {
  id: number;
  name: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}

export class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function CategoryFactory(sequelize: Sequelize): typeof Category {
  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 20],
        },
      },
    },
    {
      tableName: "categories",
      sequelize,
    }
  );

  return Category;
}
