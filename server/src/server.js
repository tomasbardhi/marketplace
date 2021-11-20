require("dotenv").config()
const express = require("express")
const db = require("./db");
const cors = require("cors")
const port = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())

// get all creators
app.get("/api/v1/creator", async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM creator`)
        if (result.rows.length === 0) {
            res.json({
                status: "failed",
                message: "no creators found"
            })
        } else {
            res.status(200).json({
                status: "success",
                length: result.rows.length,
                data: {
                    creator: result.rows
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

// get one creator
app.get("/api/v1/creator/:id", async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM creator WHERE creator_id = $1`, [req.params.id])
        if (result.rows.length === 0) {
            res.json({
                status: "failed",
                message: "creator not found"
            })
        } else {
            res.status(200).json({
                status: "success",
                length: result.rows.length,
                data: {
                    creator: result.rows[0]
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

// create creator
app.post("/api/v1/createCreator", async (req, res) => {
    try {
        const result = await db.query(`INSERT INTO creator (creator_name, creator_address) VALUES ($1, $2) returning *`, [req.body.creator_name, req.body.creator_address])
        res.status(200).json({
            status: "success",
            length: result.rows.length,
            data: {
                creator: result.rows[0]
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

// update creator
app.put("/api/v1/updateCreator/:id", async (req, res) => {
    try {
        const cols = Object.keys(req.body)
        const vals = Object.values(req.body)

        let query = `UPDATE creator SET`;
        let i;
        for (i = 0; i < cols.length; i++) {
            if (i === cols.length - 1) {
                query = query + ` ` + cols[i] + ` = $` + `${i + 1}`
            } else {
                query = query + ` ` + cols[i] + ` = $` + `${i + 1},`
            }
        }
        query = query + ` WHERE creator_id = $` + `${i + 1} returning *`
        const result = await db.query(query, [...vals, req.params.id])
        if (result.rows.length === 0) {
            res.json({
                status: "failed",
                message: "creator not found"
            })
        } else {
            res.status(200).json({
                status: "success",
                length: result.rows.length,
                data: {
                    creator: result.rows[0]
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

// delete creator
app.delete("/api/v1/deleteCreator/:id", async (req, res) => {
    try {
        const result = await db.query(`DELETE FROM creator WHERE creator_id = $1 returning *`, [req.params.id])
        if (result.rows.length === 0) {
            res.json({
                status: "failed",
                message: "creator not found"
            })
        } else {
            res.status(200).json({
                status: "success",
                length: result.rows.length,
                data: {
                    creator: result.rows[0]
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

// get all collections
app.get("/api/v1/collection", async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM collection`)
        if (result.rows.length === 0) {
            res.json({
                status: "failed",
                message: "no collection found"
            })
        } else {
            res.status(200).json({
                status: "success",
                length: result.rows.length,
                data: {
                    collection: result.rows
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

// get one collection
app.get("/api/v1/collection/:id", async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM collection WHERE collection_id = $1`, [req.params.id])
        if (result.rows.length === 0) {
            res.json({
                status: "failed",
                message: "collection not found"
            })
        } else {
            res.status(200).json({
                status: "success",
                length: result.rows.length,
                data: {
                    collection: result.rows[0]
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

// create collection
app.post("/api/v1/createCollection", async (req, res) => {
    try {
        const result = await db.query(`INSERT INTO collection (collection_creator_id, collection_name) VALUES ($1, $2) returning *`, [req.body.collection_creator_id, req.body.collection_name])
        res.status(200).json({
            status: "success",
            length: result.rows.length,
            data: {
                collection: result.rows[0]
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

// update collection
app.put("/api/v1/updateCollection/:id", async (req, res) => {
    try {
        const cols = Object.keys(req.body)
        const vals = Object.values(req.body)

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

        const result = await db.query(query, [...vals, req.params.id])
        if (result.rows.length === 0) {
            res.json({
                status: "failed",
                message: "collection not found"
            })
        } else {
            res.status(200).json({
                status: "success",
                length: result.rows.length,
                data: {
                    collection: result.rows[0]
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

// delete collection
app.delete("/api/v1/deleteCollection/:id", async (req, res) => {
    try {
        const result = await db.query(`DELETE FROM collection WHERE collection_id = $1 returning *`, [req.params.id])
        if (result.rows.length === 0) {
            res.json({
                status: "failed",
                message: "collection not found"
            })
        } else {
            res.status(200).json({
                status: "success",
                length: result.rows.length,
                data: {
                    collection: result.rows[0]
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})


// get all singles
app.get("/api/v1/single", async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM single`)
        if (result.rows.length === 0) {
            res.json({
                status: "failed",
                message: "no singles found"
            })
        } else {
            res.status(200).json({
                status: "success",
                length: result.rows.length,
                data: {
                    single: result.rows
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

// get one single
app.get("/api/v1/single/:id", async (req, res) => {
    try {
        const result = await db.query(`SELECT * FROM single WHERE single_id = $1`, [req.params.id])
        if (result.rows.length === 0) {
            res.json({
                status: "failed",
                message: "single not found"
            })
        } else {
            res.status(200).json({
                status: "success",
                length: result.rows.length,
                data: {
                    single: result.rows[0]
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

// create single
app.post("/api/v1/createSingle", async (req, res) => {
    try {
        const result = await db.query(`INSERT INTO single (single_creator_id, single_collection_id, single_name) VALUES ($1, $2, $3) returning *`, [req.body.single_creator_id, req.body.single_collection_id, req.body.single_name])
        res.status(200).json({
            status: "success",
            length: result.rows.length,
            data: {
                single: result.rows[0]
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

// update single
app.put("/api/v1/updateSingle/:id", async (req, res) => {
    try {
        const cols = Object.keys(req.body)
        const vals = Object.values(req.body)

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

        const result = await db.query(query, [...vals, req.params.id])
        if (result.rows.length === 0) {
            res.json({
                status: "failed",
                message: "single not found"
            })
        } else {
            res.status(200).json({
                status: "success",
                length: result.rows.length,
                data: {
                    single: result.rows[0]
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

// delete single
app.delete("/api/v1/deleteSingle/:id", async (req, res) => {
    try {
        const result = await db.query(`DELETE FROM single WHERE single_id = $1 returning *`, [req.params.id])
        if (result.rows.length === 0) {
            res.json({
                status: "failed",
                message: "single not found"
            })
        } else {
            res.status(200).json({
                status: "success",
                length: result.rows.length,
                data: {
                    single: result.rows[0]
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

app.listen(port, () => {
    console.log(`Server is up and listening on port: ${port}`)
})