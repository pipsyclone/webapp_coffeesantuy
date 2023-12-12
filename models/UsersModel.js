import { Sequelize } from "sequelize";
import connection from "../config/database.js";

const { DataTypes } = Sequelize

const Users = connection.define('users', {
    userid:             {type: DataTypes.STRING(13), primaryKey: true},
    name:               DataTypes.STRING,
    email:              DataTypes.STRING,
    password:           DataTypes.STRING,
    role:               DataTypes.STRING,
    password_status:    DataTypes.STRING,
    account_status:     DataTypes.STRING
}, {
    freezeTableName: true
})

export default Users;

(async () => {
    await connection.sync()
})()