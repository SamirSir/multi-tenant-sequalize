import { Model, Table, Column, DataType, Association } from "sequelize-typescript";

@Table({ tableName: 'messages' })

export class Messages extends Model {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    })
    text!: string;
}


// const getMessageModel = (sequelize, { DataTypes }) => {
//     const Message = sequelize.define('message', {
//         text: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true,
//             },
//         },
//     });
//     Message.associate = (models) => {
//         Message.belongsTo(models.User);
//     };
//     return Message;
// };

// export default getMessageModel;
