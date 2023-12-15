import Orders from "../models/OrdersModel.js";
import OrdersDetails from "../models/OrdersDetailsModel.js";
import Randomstring from "randomstring";

export const setOrders = async (req, res) => {
    try {
        const orderid = 'TRX' + Randomstring.generate({ length: 9, charset: 'numeric' })
        await Orders.create({
            orderid:            orderid,
            contact_customer:   req.body.contact_customer,
            table_number:       req.body.tableNumber,
            quantity:           req.body.quantity,
            total_price:        req.body.totalPrice
        })

        await OrdersDetails.bulkCreate(req.body.orderDetails)
        res.json({status: 200, message: "Pesanan anda akan segera datang, terima kasih sudah memesan!"})
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}

export const getByOrderId = async (req, res) => {
    try {
        const response = await OrdersDetails.findOne({ where: {orderid: req.params.orderid} })

        if (response.length < 1) {
            res.json({status: 404, message: "Data tidak ditemukan!"})
        }else {
            res.json({status: 200, message: "OK!", data: response})
        }
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}

export const removeAllOrders = async (req, res) {
    try {
        await Orders.destroy({ truncate: true })
        await OrdersDetails.destroy({ truncate: true })

        res.json({status: 200, message: "Berhasil menghapus semua data!"})
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}