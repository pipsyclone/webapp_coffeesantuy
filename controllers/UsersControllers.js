import { Op } from "sequelize";
import Users from "../models/UsersModel.js";
import randomstring from "randomstring";

export const getAllUsers = async (req, res) => {
    try {
        const response = await Users.findAll()
        res.json({status: 200, message: "OK!", data: response})
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}

export const getUsersById = async (req, res) => {
    try {
        const response = await Users.findOne({where: {userid: req.params.userid}})
        res.json({status: 200, message: "OK!", data: response})
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}

export const setUsers = async (req, res) => {
    try {
        const getEmail = await Users.findOne({where : { email: req.body.email }})

        if (getEmail !== null) {
            res.json({status: 400, message: "Email sudah digunakan!"})
        }else {
            const userid = 'USR' + randomstring.generate({ length: 9, charset: 'numeric' })
            await Users.create(
                {
                    userid:             userid,
                    name:               req.body.name,
                    email:              req.body.email,
                    password:           req.body.password,
                    role:               req.body.role,
                    password_status:    "CHANGED",
                    account_status:     "ACTIVE"
                }
            )

            res.json({status: 200, message: "Data berhasil ditambahkan!"})
        }
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}

export const searchUsers = async (req, res) => {
    try {
        const searchOptions = {
            where: {
                [Op.or]: [
                    {userid   : { [Op.like]: `%${req.params.keyword}%` }},
                    {username : { [Op.like]: `%${req.params.keyword}%` }},
                    {email    : { [Op.like]: `%${req.params.keyword}%` }},
                ]
            }
        }
        const searchResult = await Users.findAll(searchOptions)

        if (searchResult.length < 1) {
            res.json({status: 404, message: "Pengguna tidak ditemukan!"})
        }else {
            res.json({status: 200, message: "OK!", data: searchResult})
        }
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}

export const loginUsers = async (req, res) => {
    try {
        const loginOptions = {
            where: {
                [Op.and] : [
                    {email: req.body.email},
                    {password: req.body.password}
                ]
            }
        }

        const loginResult = await Users.findAll(loginOptions)

        if (loginResult < 1) {
            res.json({status: 404, message: "Email/Password anda salah!"})
        }else if (loginResult[0].account_status === "BANNED") {
            res.json({status: 400, message: "Akun anda telah diblokir!"})
        }else {
            res.json({status: 200, message: "Berhasil masuk!"})
        }
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}

export const removeUsers = async (req, res) => {
    try {
        await Users.destroy({where: {userid: req.params.userid}})
        res.json({status: 200, message: "Berhasil menghapus pengguna!"})
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}

export const removeAllUsers = async (req, res) => {
    try {
        await Users.destroy({ truncate: true })
        res.json({status: 200, message: "Berhasil menghapus semua pengguna!"})
    } catch (err) {
        res.json({status: 500, message: err.message})
    }
}