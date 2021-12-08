const db = require("../db");
const bcrypt = require('bcrypt');
import Auth from "../models/authModel"

const register = async (body: Auth) => {
    try {
        if(body.username === undefined || body.password == undefined){
            return ({
                status: "failed",
                message: "body or username missing"
            })
        }
        if((await db.query(`SELECT * FROM creator WHERE creator_name = $1`, [body.username])).rows.length != 0){
            return ({
                status: "failed",
                message: "username already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(body.password, 10)
        const result = await db.query(`INSERT INTO creator (creator_name, creator_password) VALUES ($1, $2) returning *`, [body.username, hashedPassword])
        return ({
            status: "success",
            length: result.rows.length,
            data: {
                creator: result.rows[0]
            }
        })
    } catch (error: any) {
        return ({
            status: "failed",
            message: error.message
        })
    }
}

const login = async (body: Auth) => {
    try {
        const response = await db.query(`SELECT * FROM creator WHERE creator_name = $1`, [body.username])
        if(response.rows.length == 0){
            return ({
                status: "failed",
                message: "user not found"
            })
        }
        console.log(response.rows[0])
        if(await bcrypt.compare(body.password, response.rows[0].creator_password)){
            return ({
                status: "success",
                length: response.rows.length,
                data: {
                    creator: response.rows[0]
                }
            })
        }else{
            return ({
                status: "failed",
                message: "wrong credentials"
            })
        }
    } catch (error: any) {
        return ({
            status: "failed",
            message: error.message
        })
    }
}

export default {register, login}