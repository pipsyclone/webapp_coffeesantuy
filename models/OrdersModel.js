import { Sequelize } from "sequelize";
import connection from "../config/database.js";

const { DataTypes } = Sequelize

const Orders = connection.define('orders', {
    orderid:            {type: DataTypes.STRING(13), primaryKey: true},
    name_customer:      DataTypes.STRING,
    contact_customer:   DataTypes.STRING,
    table_number:       DataTypes.INTEGER,
    quantity:           DataTypes.INTEGER,
    total_price:        DataTypes.INTEGER
}, {
    freezeTableName: true
})

export default Orders;

(async () => {
    await connection.sync()
})()