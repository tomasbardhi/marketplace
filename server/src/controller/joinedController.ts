import express from "express"
import verifyToken from "../middleware/verifyToken"
import joinedService from "../service/joinedService"
const router = express.Router()

// get join between creator and single and collection, filter only one single
router.get("/", async (req, res) => {
    const response = await joinedService.getAllData(req)
    res.send(response)
})

// get join between creator and single and collection, filter only one single
router.get("/:id", verifyToken, async (req, res) => {
    const response = await joinedService.getAllDataById(parseInt(req.params.id))
    res.send(response)
})


export default router