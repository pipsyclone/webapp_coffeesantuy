import { Sequelize } from "sequelize";
import connection from "../config/database.js";

const { DataTypes } = Sequelize

const Products = connection.define('products', {
    productid:          {type: DataTypes.STRING(13), primaryKey: true},
    userid:             DataTypes.STRING(13),
    product_name:       DataTypes.STRING,    
    product_price:      DataTypes.INTEGER,
    product_image:      DataTypes.TEXT,
    product_description:DataTypes.TEXT
}, {
    freezeTableName: true
})

export default Products;

(async () => {
    await connection.sync()
})()