const db = require('../db')
import Collection from "../models/collectionModel"

const get = async (req: any) => {
    try {
        let result:any
        if(req.query.page === undefined || req.query.limit === undefined){
            result = await db.query(`SELECT * FROM collection`)
        }else{
            result = await db.query(`SELECT * FROM collection OFFSET $1 LIMIT $2`, [(req.query.page-1)*req.query.limit, req.query.limit])
        }
        if (result.rows.length === 0) {
            return ({
                status: "failed",
                message: "no collection found"
            })
        } else {
            return ({
                status: "success",
                length: result.rows.length,
                data: {
                    collection: result.rows
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
        const result = await db.query(`SELECT * FROM collection WHERE collection_id = $1`, [id])
        if (result.rows.length === 0) {
            return ({
                status: "failed",
                message: "collection not found"
            })
        } else {
            return ({
                status: "success",
                length: result.rows.length,
                data: {
                    collection: result.rows[0]
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


const getByCreatorId = async (id: number) => {
    try {
        const result = await db.query(`SELECT * FROM collection WHERE collection_creator_id = $1`, [id])
        if (result.rows.length === 0) {
            return ({
                status: "failed",
                message: "collection not found"
            })
        } else {
            return ({
                status: "success",
                length: result.rows.length,
                data: {
                    collection: result.rows
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

const create = async (body: Collection) => {
    try {
        const result = await db.query(`INSERT INTO collection (collection_creator_id, collection_name) VALUES ($1, $2) returning *`, [body.collection_creator_id, body.collection_name])
        return ({
            status: "success",
            length: result.rows.length,
            data: {
                collection: result.rows[0]
            }
        })
    } catch (error: any) {
        return ({
            status: "failed",
            message: error.message
        })
    }
}

const update = async (id: number, body: Collection) => {
    try {
        const cols = Object.keys(body)
        const vals = Object.values(body)

        let query = `UPDATE collection SET`;
        let i;
        for (i = 0; i < cols.length; i++) {
            if (i === cols.length - 1) {
                query = query + ` ` + cols[i] + ` = $` + `${i + 1}`
            } else {
                query = query + ` ` + cols[i] + ` = $` + `${i + 1},`
            }
        }
        query = query + ` WHERE collection_id = $` + `${i + 1} returning *`

        const result = await db.query(query, [...vals, id])
        if (result.rows.length === 0) {
            return ({
                status: "failed",
                message: "collection not found"
            })
        } else {
            return ({
                status: "success",
                length: result.rows.length,
                data: {
                    collection: result.rows[0]
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
        const result = await db.query(`DELETE FROM collection WHERE collection_id = $1 returning *`, [id])
        if (result.rows.length === 0) {
            return ({
                status: "failed",
                message: "collection not found"
            })
        } else {
            return ({
                status: "success",
                length: result.rows.length,
                data: {
                    collection: result.rows[0]
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

export default { get, getById, getByCreatorId, create, update, remove }