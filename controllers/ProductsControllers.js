import { Op } from "sequelize";
import Products from "../models/ProductsModel.js";
import Randomstring from "randomstring";
import fs from "fs";

export const setProducts = async (req, res) => {
    try {
        const checkProductName = await Products.findOne({where: {product_name: req.body.productName}})
        if (checkProductName !== null && req.file) {
            res.json({status: 400, message: "Nama produk sudah tersedia!"})
        }else if (!req.file) {
            res.json({status: 404, message: "Tolong masukkan file gambar!"})
        }else {
            const productid = 'PRD' + Randomstring.generate({ length: 9, charset: 'numeric' })
            await Products.create({
                productid:          productid,
                userid:             req.body.userid,
                product_name:       req.body.productName,
                product_price:       req.body.productPrice,
                product_image:      req.file.path,
                product_description:req.body.productDesc
            })

            res.json({status: 200, message: "Berhasil menambahkan produk!"})
        }
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const response = await Products.findAll()
        res.json({status: 200, message: "OK!", data: response})
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}

export const getProductsById = async (req, res) => {
    try {
        const checkProduct = await Products.findOne({where: {productid: req.params.productid}})

        if (checkProduct === null) {
            res.json({status: 404, message: "Data tidak ditemukan atau terhapus!"})
        }else {
            res.json({status: 200, message: "OK!", data: response})
        }
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}

export const searchProducts = async (req, res) => {
    try {
        const searchResult = await Products.findAll({where: {
            [Op.or]: [
                {product_name       : { [Op.like]: `%${req.params.keyword}%` }},
                {product_description: { [Op.like]: `%${req.params.keyword}%` }}
            ]
        }})

        if (searchResult.length < 1) {
            res.json({status: 404, message: "Produk tidak ditemukan!"})
        }else {
            res.json({status: 200, message: "OK!", data: searchResult})
        }
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}

export const updateProducts = async (req,res) => {
    try {
        const checkProduct = await Products.findOne({where: {productid: req.params.productid}})
        if (checkProduct === null) {
            res.json({status: 404, message: "Produk tidak ditemukan atau sudah terhapus!"})
        }else if (!req.file) {
            await Products.update({
                product_name:       req.body.productName,
                product_price:      req.body.productPrice,
                product_description:req.body.productDesc
            }, {where: {productid: req.params.productid}})
            res.json({status: 200, message: "Berhasil mengubah data!"})
        }else {
            await Products.update({
                product_name:       req.body.productName,
                product_price:      req.body.productPrice,
                product_image:      req.file.path,
                product_description:req.body.productDesc
            }, {where: {productid: req.params.productid}})
            res.json({status: 200, message: "Berhasil mengubah data!"})
        }
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}

export const removeAllProducts = async (req, res) => {
    try {
        await Products.destroy({ truncate: true })
        res.json({status: 200, message: "Berhasil menghapus semua data!"})
        fs.rmSync('images', { recursive: true, force: true })
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}

export const removeProducts = async (req, res) => {
    try {
        const imagePath = await Products.findOne({ where: {productid: req.params.productid} })
        fs.unlinkSync(imagePath.product_image)
        await Products.destroy({ where: {productid: req.params.productid} })
        res.json({status: 200, message: "Berhasil menghapus data!"})
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}