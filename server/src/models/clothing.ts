// NEEDS WORK

import {
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
  DataTypes,
  type Sequelize,
  type ForeignKey,
} from "sequelize";

import type { Category } from "./category.js";

export class Clothing extends Model<
  InferAttributes<Clothing>,
  InferCreationAttributes<Clothing>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare price: number;
  declare category_id: ForeignKey<Category["id"]>;
  declare size: string;
  declare stock_quantity: number;
  declare image_url: string

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export function ClothingFactory(sequelize: Sequelize) {
  Clothing.init(
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
                len: [0, 30],
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 100],
            },
        },
        price: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
      tableName: "clothing",
      sequelize,
    }
  )
  return Clothing;
}