import express from "express"
import joinedService from "../service/joinedService"
const router = express.Router()

// get join between creator and single and collection, filter only one single
router.get("/", async (req, res) => {
    const response = await joinedService.getAllData()
    res.send(response.data)
})

// get join between creator and single and collection, filter only one single
router.get("/:id", async (req, res) => {
    const response = await joinedService.getAllDataById(parseInt(req.params.id))
    res.send(response.data)
})


export default router