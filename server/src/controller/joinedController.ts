import express from "express"
import verifyToken from "../middleware/verifyToken"
import joinedService from "../service/joinedService"
const router = express.Router()

// get join between creator and single and collection
router.get("/", async (req, res) => {
    const response = await joinedService.getAllData(req)
    res.send(response)
})

// get join between creator and single and collection, filter only one single
router.get("/single/:id", async (req, res) => {
    const response = await joinedService.getAllDataBySingleId(parseInt(req.params.id))
    res.send(response)
})

// get join between creator and single and collection, filter only one creator
router.get("/creator/:id", async (req, res) => {
    const response = await joinedService.getAllDataByCreatorId(parseInt(req.params.id))
    res.send(response)
})


export default router