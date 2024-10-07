import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';

interface UserAttributes {
    id: number;
    first: string;
    last: string;
    email: string;
    password: string;
    phoneNum: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {

    public id!: number;
    public first!: string;
    public last!: string;
    public email!: string;
    public password!: string;
    public phoneNum!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public async setPassword(password: string) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(password, saltRounds);
    }
}

export function UserFactory(sequelize: Sequelize): typeof User {

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            first: {
                type: DataTypes.STRING,
                allowNull: false
            },
            last: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [8, 20]
                }
            },
            phoneNum: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    is: /^[0-9+\-() ]+$/i
                }
            }
        },
        {
            tableName: 'users',
            sequelize,
            hooks: {
                beforeCreate: async (user: User) => {
                    await user.setPassword(user.password);
                  },
                  beforeUpdate: async (user: User) => {
                    if (user.changed('password')) {
                      await user.setPassword(user.password);
                    }
                  },
            }
        }
    );

    return User;
}