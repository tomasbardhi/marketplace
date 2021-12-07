const db = require('../db')
import Model from "../models/singleModel"

const get = async () => {
    try {
        const result = await db.query(`SELECT * FROM single`)
        if (result.rows.length === 0) {
            return ({
                status: "failed",
                message: "no singles found"
            })
        } else {
            return ({
                status: "success",
                length: result.rows.length,
                data: {
                    single: result.rows
                }
            })
        }
    } catch (error: any) {
        return ({
            status: "failed",
            message: error.message
        })
    }
}

const getById = async (id: number) => {
    try {
        const result = await db.query(`SELECT * FROM single WHERE single_id = $1`, [id])
        if (result.rows.length === 0) {
            return ({
                status: "failed",
                message: "single not found"
            })
        } else {
            return ({
                status: "success",
                length: result.rows.length,
                data: {
                    single: result.rows[0]
                }
            })
        }
    } catch (error: any) {
        return ({
            status: "failed",
            message: error.message
        })
    }
}

const create = async (body: Model) => {
    try {
        const result = await db.query(`INSERT INTO single (single_creator_id, single_collection_id, single_name) VALUES ($1, $2, $3) returning *`, [body.single_creator_id, body.single_collection_id, body.single_name])
        return ({
            status: "success",
            length: result.rows.length,
            data: {
                single: result.rows[0]
            }
        })
    } catch (error: any) {
        return ({
            status: "failed",
            message: error.message
        })
    }
}

const update = async (id: number, body: Model) => {
    try {
        const cols = Object.keys(body)
        const vals = Object.values(body)

        let query = `UPDATE single SET`;
        let i;
        for (i = 0; i < cols.length; i++) {
            if (i === cols.length - 1) {
                query = query + ` ` + cols[i] + ` = $` + `${i + 1}`
            } else {
                query = query + ` ` + cols[i] + ` = $` + `${i + 1},`
            }
        }
        query = query + ` WHERE single_id = $` + `${i + 1} returning *`

        const result = await db.query(query, [...vals, id])
        if (result.rows.length === 0) {
            return ({
                status: "failed",
                message: "single not found"
            })
        } else {
            return ({
                status: "success",
                length: result.rows.length,
                data: {
                    single: result.rows[0]
                }
            })
        }
    } catch (error: any) {
        return ({
            status: "failed",
            message: error.message
        })
    }
}

const remove = async (id: number) => {
    try {
        const result = await db.query(`DELETE FROM single WHERE single_id = $1 returning *`, [id])
        if (result.rows.length === 0) {
            return ({
                status: "failed",
                message: "single not found"
            })
        } else {
            return ({
                status: "success",
                length: result.rows.length,
                data: {
                    single: result.rows[0]
                }
            })
        }
    } catch (error: any) {
        return ({
            status: "failed",
            message: error.message
        })
    }
}

export default { get, getById, create, update, remove }