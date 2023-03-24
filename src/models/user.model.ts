import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({ tableName: 'users', timestamps: false })

export class Users extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: string;
}

const getUserModel = (sequelize, { DataTypes }) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        address: {
            type: DataTypes.STRING
        }
    });

    User.associate = (models) => {
        User.hasMany(models.Message);
    };

    User.create = async (username: string) => {
        await User.create(username);
    };

    User.findByLogin = async (login) => {
        let user = await User.findOne({
            where: { username: login },
        });
        if (!user) {
            user = await User.findOne({
                where: { email: login },
            });
        }
        return user;
    };
    return User;
};

export default getUserModel;
