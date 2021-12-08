const db = require("../db");
import Creator from "../models/creatorModel"

const get = async () => {
    try {
        const result = await db.query(`SELECT * FROM creator`)
        if (result.rows.length === 0) {
            return ({
                status: "failed",
                message: "no creators found"
            })
        } else {
            return ({
                status: "success",
                length: result.rows.length,
                data: {
                    creator: result.rows
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
        const result = await db.query(`SELECT * FROM creator WHERE creator_id = $1`, [id])
        if (result.rows.length === 0) {
            return ({
                status: "failed",
                message: "creator not found"
            })
        } else {
            return ({
                status: "success",
                length: result.rows.length,
                data: {
                    creator: result.rows[0]
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

// const create = async (body: Creator) => {
//     try {
//         const result = await db.query(`INSERT INTO creator (creator_name, creator_address) VALUES ($1, $2) returning *`, [body.creator_name, body.creator_address])
//         return ({
//             status: "success",
//             length: result.rows.length,
//             data: {
//                 creator: result.rows[0]
//             }
//         })
//     } catch (error: any) {
//         return ({
//             status: "failed",
//             message: error.message
//         })
//     }
// }

// const update = async (id: number, body: Creator) => {
//     try {
//         const cols = Object.keys(body)
//         const vals = Object.values(body)

//         let query = `UPDATE creator SET`;
//         let i;
//         for (i = 0; i < cols.length; i++) {
//             if (i === cols.length - 1) {
//                 query = query + ` ` + cols[i] + ` = $` + `${i + 1}`
//             } else {
//                 query = query + ` ` + cols[i] + ` = $` + `${i + 1},`
//             }
//         }
//         query = query + ` WHERE creator_id = $` + `${i + 1} returning *`
//         const result = await db.query(query, [...vals, id])
//         if (result.rows.length === 0) {
//             return ({
//                 status: "failed",
//                 message: "creator not found"
//             })
//         } else {
//             return ({
//                 status: "success",
//                 length: result.rows.length,
//                 data: {
//                     creator: result.rows[0]
//                 }
//             })
//         }
//     } catch (error: any) {
//         return ({
//             status: "failed",
//             message: error.message
//         })
//     }
// }

const remove = async (id: number) => {
    try {
        const result = await db.query(`DELETE FROM creator WHERE creator_id = $1 returning *`, [id])
        if (result.rows.length === 0) {
            return ({
                status: "failed",
                message: "creator not found"
            })
        } else {
            return ({
                status: "success",
                length: result.rows.length,
                data: {
                    creator: result.rows[0]
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

export default { get, getById, /*create, update,*/ remove }