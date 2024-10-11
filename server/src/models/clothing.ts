import { DataTypes, ForeignKey, Model, Optional, Sequelize } from "sequelize";
import type { Category } from "./category.js";

interface ClothingAttributes {
    id: number;
    name: string;
    description: string;
    category_id: number;
    size: string;
    stock_quanity: number;
    image_url: string;
}

interface ClothingCreationAttributes extends Optional<ClothingAttributes, 'id'> {}

export class Clothing extends Model<ClothingAttributes, ClothingCreationAttributes> implements ClothingAttributes {

    public id!: number;
    public name!: string;
    public description!: string;
    public category_id!: ForeignKey<Category['id']>;
    public size!: string;
    public stock_quanity!: number;
    public image_url!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function ClothingFactory(sequelize: Sequelize): typeof Clothing {

    Clothing.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [0, 30]
                }
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [8, 100]
                }
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            size: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            stock_quanity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            image_url: {
                type: DataTypes.STRING,
                allowNull: true
            }

        },
        {
            tableName: 'clothing',
            sequelize
        }
    )

    return Clothing;
}