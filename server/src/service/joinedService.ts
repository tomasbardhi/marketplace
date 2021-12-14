const db = require('../db')

// get join between creator and single and collection
const getAllData = async (req: any) => {
    try {
        let result:any
        if(req.query.page === undefined || req.query.limit === undefined){
            result = await db.query(
                `SELECT * 
                FROM creator 
                JOIN collection ON creator.creator_id = collection.collection_creator_id 
                JOIN single ON collection.collection_id = single.single_collection_id`,
            )
        }else{
            result = await db.query(
                `SELECT * 
                FROM creator 
                JOIN collection ON creator.creator_id = collection.collection_creator_id 
                JOIN single ON collection.collection_id = single.single_collection_id
                OFFSET $1 LIMIT $2`, [(req.query.page-1)*req.query.limit, req.query.limit])
        }
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
const getAllDataBySingleId = async (id: number) => {
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


// get join between creator and single and collection, filter only one single
const getAllDataByCreatorId = async (id: number) => {
    try {
        const result = await db.query(
            `SELECT * 
            FROM creator 
            JOIN collection ON creator.creator_id = collection.collection_creator_id
            JOIN single ON collection.collection_id = single.single_collection_id
            WHERE creator.creator_id = $1`,
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

export default { getAllDataBySingleId, getAllDataByCreatorId, getAllData }