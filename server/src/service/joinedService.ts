const db = require('../db')

// get join between creator and single and collection
const getAllData = async () => {
    try {
        const result = await db.query(
            `SELECT * 
            FROM creator 
            JOIN collection ON creator.creator_id = collection.collection_creator_id 
            JOIN single ON collection.collection_id = single.single_collection_id`,
        )
        if (result.rows.length === 0) {
            return ({
                status: "failed",
                message: "nothing found"
            })
        } else {
            return ({
                status: "success",
                length: result.rows.length,
                data: {
                    data: result.rows
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

// get join between creator and single and collection, filter only one single
const getAllDataById = async (id: number) => {
    try {
        const result = await db.query(
            `SELECT * 
            FROM creator 
            JOIN collection ON creator.creator_id = collection.collection_creator_id
            JOIN single ON collection.collection_id = single.single_collection_id
            WHERE single.single_id = $1`,
            [id]
        )
        if (result.rows.length === 0) {
            return ({
                status: "failed",
                message: "nothing found"
            })
        } else {
            return ({
                status: "success",
                length: result.rows.length,
                data: {
                    data: result.rows[0]
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

export default { getAllDataById, getAllData }