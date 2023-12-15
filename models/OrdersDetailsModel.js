import { Sequelize } from "sequelize";
import connection from "../config/database.js";

const { DataTypes } = Sequelize

const OrdersDetails = connection.define('orders_details', {
    recent:                 {type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true},
    orderid:                DataTypes.STRING(13),
    productid:              DataTypes.STRING(13),
    quantity:               DataTypes.INTEGER,
    total_price_per_product:DataTypes.INTEGER
}, {
    freezeTableName: true
})

export default OrdersDetails;

(async () => {
    await connection.sync()
})()