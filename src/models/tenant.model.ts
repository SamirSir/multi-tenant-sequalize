import { Model, Table, Column, DataType, Association } from "sequelize-typescript";

@Table({ tableName: 'tenants', timestamps: false })

export class Tenants extends Model {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    username!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "localhost"
    })
    host!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: "postgres"
    })
    dialect!: string;
}
