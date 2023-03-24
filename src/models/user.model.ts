import { Model, Table, Column, DataType, Association } from "sequelize-typescript";

@Table({ tableName: 'users', timestamps: false })

export class Users extends Model {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: string;
}
